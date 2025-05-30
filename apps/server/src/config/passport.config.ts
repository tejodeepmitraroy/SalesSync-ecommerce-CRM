import passport from 'passport';
import passportJwt from 'passport-jwt';
import { comparePassword } from '../helper/hasher';
import passportLocal from 'passport-local';
import { generateRefreshToken } from '../helper/token';
// import passportOAuth from "passport-google-oauth20";
import { db } from '../db';
import { eq } from 'drizzle-orm';
import {  user } from '../db/schema/user';

// interface GoogleUserProfile {
//   id: string;
//   displayName: string;
//   name: { familyName: string; givenName: string };
//   emails: Array<{ value: string; verified: boolean }>;
//   photos: Array<{
//     value: string;
//   }>;
//   provider: string;
// }

const localStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
// const OAuth2Strategy = passportOAuth.Strategy;

const accessTokenSecretKey = process.env.ACCESS_TOKEN_SECRET!;

export const initializePassportStrategies = () => {
	passport.use(
		new localStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			async (email, password, done) => {
				//authentication Logic here
				try {
					console.log('Receive Credentials', email, password);
					const userDetails = await db.query.user.findFirst({
						where: eq(user.email, email),
					});

					// let userType: 'user' | 'customer' = 'user';

					// 2. If not found in user, try finding in `customer`
					// if (!userDetails) {
					// 	const customerDetails = await db.query.customer.findFirst({
					// 		where: eq(customer.email, email),
					// 	});
					// 	// userType = 'customer';
					// }

					if (!userDetails) {
						return done(null, false, { message: 'Incorrect email' });
					}

					console.debug('user Details', userDetails);

					const isPasswordMatched = await comparePassword(
						password,
						userDetails.password!
					);

					if (isPasswordMatched) {
						///User is Authenticated
						console.log('Auth Parsed User-->', isPasswordMatched);

						const refreshToken = generateRefreshToken(userDetails.id);

						const updatedUser = await db
							.update(user)
							.set({
								refreshToken,
							})
							.where(eq(user.id, user.id))
							.returning();

						console.log(
							'Fetch User data in Local stratigy FNS',
							email,
							password,
							refreshToken
						);
						return done(null, updatedUser[0]);
					} else {
						return done(null, false, { message: 'Incorrect Password' });
					}
				} catch (error) {
					return done(error);
				}
			}
		)
	);

	passport.use(
		new JwtStrategy(
			{
				secretOrKey: accessTokenSecretKey,
				jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			},
			async function (jwtPayload, done) {
				//authentication Logic here

				console.log('Fetch User data in Local stratigy FNS', jwtPayload);
				// try {
				// 	const user = await prisma.user.findUnique({
				// 		where: {
				// 			id: jwtPayload.id,
				// 		},
				// 	});

				// 	return user ? done(null, user) : done(null, false);
				// } catch (error) {
				// 	return done(error, false);
				// }
				return jwtPayload ? done(null, jwtPayload) : done(null, false);
			}
		)
	);

	// passport.use(
	//   new OAuth2Strategy(
	//     {
	//       clientID: process.env.OAUTH_CLIENT_ID!,
	//       clientSecret: process.env.OAUTH_CLIENT_SECRET!,
	//       callbackURL: "/api/v1/auth/google/callback",
	//     },
	//     async function (accessToken, refreshToken, profile, done) {
	//       const userProfile = profile as GoogleUserProfile;
	//       try {
	//         let user = await prisma.user.findUnique({
	//           where: {
	//             googleId: profile.id,
	//           },
	//         });

	//         if (!user) {
	//           user = await prisma.user.create({
	//             data: {
	//               googleId: userProfile.id,
	//               email: userProfile.emails[0].value,
	//               fullName: userProfile.displayName,
	//               avatar: userProfile.photos[0]?.value,
	//               isEmailVerified: true,
	//             },
	//           });
	//         }

	//         const refreshToken = generateRefreshToken(user.id);

	//         const updatedUser = await prisma.user.update({
	//           where: {
	//             id: user.id,
	//           },
	//           data: {
	//             refreshToken,
	//           },
	//         });

	//         return done(null, updatedUser);
	//       } catch (error) {
	//         return done(error, false);
	//       }
	//     }
	//   )
	// );
};
