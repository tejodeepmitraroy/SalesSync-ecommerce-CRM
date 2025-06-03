import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Package,
	Search,
	Download,
	AlertTriangle,
	History,
} from 'lucide-react';
// Import refactored components
import { useInventory } from '@/features/Inventory/components/useInventory';
import { InventoryItem } from '@/features/Inventory/components/types';
import InventoryFilters from '@/features/Inventory/components/InventoryFilters';
import InventoryTable from '@/features/Inventory/components/InventoryTable';
import MovementHistoryTable from '@/features/Inventory/components/MovementHistoryTable';
import AdjustStockDialog from '@/features/Inventory/components/AdjustStockDialog';
import MovementHistoryDialog from '@/features/Inventory/components/MovementHistoryDialog';
import LowStockAlert from '@/features/Inventory/components/LowStockAlert';
import HeaderSection from '@/components/layouts/HeaderSection';

const InventoryManagement: React.FC = () => {
	const {
		searchTerm,
		setSearchTerm,
		categoryFilter,
		setCategoryFilter,
		statusFilter,
		setStatusFilter,
		sortField,
		sortDirection,
		handleSort,
		handleAdjustStock,
		handleExportInventory,
		getProductMovements,
		uniqueCategories,
		filteredInventory,
		lowStockItems,
		stockMovements,
	} = useInventory();

	// Dialogs state
	const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false);
	const [isMovementHistoryOpen, setIsMovementHistoryOpen] = useState(false);
	const [isLowStockOpen, setIsLowStockOpen] = useState(false);
	const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);

	return (
		<div className="space-y-6">
			<HeaderSection
				icon={<Package />}
				title="Inventory Management"
				description="Monitor and manage your product inventory"
			/>

			<Tabs defaultValue="current">
				<div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<TabsList>
						<TabsTrigger value="current" className="flex items-center gap-2">
							<Package className="h-4 w-4" />
							Current Inventory
						</TabsTrigger>
						<TabsTrigger value="movements" className="flex items-center gap-2">
							<History className="h-4 w-4" />
							Stock Movements
						</TabsTrigger>
					</TabsList>
					<div className="flex items-center gap-2">
						<Button
							onClick={handleExportInventory}
							variant="outline"
							className="flex items-center gap-2"
						>
							<Download className="h-4 w-4" />
							Export to Excel
						</Button>
						<Button
							onClick={() => setIsLowStockOpen(true)}
							variant={lowStockItems.length > 0 ? 'destructive' : 'outline'}
							className="flex items-center gap-2"
						>
							<AlertTriangle className="h-4 w-4" />
							Low Stock Items ({lowStockItems.length})
						</Button>
					</div>
				</div>

				<TabsContent value="current">
					<Card>
						<CardHeader className="pb-3">
							<CardTitle>Product Inventory</CardTitle>

							<InventoryFilters
								searchTerm={searchTerm}
								categoryFilter={categoryFilter}
								statusFilter={statusFilter}
								uniqueCategories={uniqueCategories}
								setSearchTerm={setSearchTerm}
								setCategoryFilter={setCategoryFilter}
								setStatusFilter={setStatusFilter}
							/>
						</CardHeader>

						<CardContent>
							<InventoryTable
								filteredInventory={filteredInventory}
								sortField={sortField}
								sortDirection={sortDirection}
								handleSort={handleSort}
								onAdjustStock={(item) => {
									setCurrentItem(item);
									setIsAdjustStockOpen(true);
								}}
								onViewHistory={(item) => {
									setCurrentItem(item);
									setIsMovementHistoryOpen(true);
								}}
							/>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="movements">
					<Card>
						<CardHeader>
							<CardTitle>Stock Movement History</CardTitle>
							<div className="relative mt-4 max-w-sm flex-1">
								<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
								<Input
									placeholder="Search movements..."
									className="pl-10"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</CardHeader>

						<CardContent>
							<MovementHistoryTable
								movements={stockMovements}
								searchTerm={searchTerm}
							/>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>

			{/* Dialogs */}
			<AdjustStockDialog
				isOpen={isAdjustStockOpen}
				setIsOpen={setIsAdjustStockOpen}
				currentItem={currentItem}
				onAdjustStock={(adjustment) => {
					if (currentItem) {
						handleAdjustStock(currentItem, adjustment);
						setIsAdjustStockOpen(false);
					}
				}}
			/>

			<MovementHistoryDialog
				isOpen={isMovementHistoryOpen}
				setIsOpen={setIsMovementHistoryOpen}
				currentItem={currentItem}
				productMovements={
					currentItem ? getProductMovements(currentItem.productId) : []
				}
				onAdjustStock={() => {
					setIsMovementHistoryOpen(false);
					setIsAdjustStockOpen(true);
				}}
			/>

			<LowStockAlert
				isOpen={isLowStockOpen}
				setIsOpen={setIsLowStockOpen}
				lowStockItems={lowStockItems}
				onRestockItem={(item) => {
					setCurrentItem(item);
					setIsLowStockOpen(false);
					setIsAdjustStockOpen(true);
				}}
			/>
		</div>
	);
};

export default InventoryManagement;
