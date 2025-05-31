'use server';
import nodemailer from 'nodemailer';
import { render } from '@react-email/components';

import ForgetPassportEmail from '../emails/ForgetPassportEmail';
import nodemailer_config from '../config/nodemailer.config';

const transporter = nodemailer.createTransport({
	host: nodemailer_config.host,
	port: nodemailer_config.port,
	secure: nodemailer_config.secure, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: nodemailer_config.auth.user,
		pass: nodemailer_config.auth.password,
	},
});

interface SenderEmailProps {
	receiverEmail: string;
	userFirstName: string;
	token: string;
}

export const forgotPasswordEmail = async ({
	receiverEmail,
	userFirstName,
	token,
}: SenderEmailProps) => {
	try {
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: nodemailer_config.senderFrom, // sender address
			to: receiverEmail, // list of receivers
			subject: 'Salesless Password Reset Request', // Subject line
			html: await render(ForgetPassportEmail({ token, userFirstName })),
		});

		console.log(info.messageId);
		return info;
	} catch (error) {
		console.log(error);
		return error;
	}
};
