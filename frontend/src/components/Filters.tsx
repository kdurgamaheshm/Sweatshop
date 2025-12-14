export default function Filters({ setFilters }: any) {
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="text-sm font-semibold text-[#1f3b60] mb-3">
                Filter Sweets
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* Name */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">Sweet Name</label>
                    <input
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                        placeholder="e.g. Badusha"
                        onChange={(e) =>
                            setFilters((f: any) => ({ ...f, name: e.target.value }))
                        }
                    />
                </div>

                {/* Category */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">Category</label>
                    <input
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                        placeholder="e.g. Traditional"
                        onChange={(e) =>
                            setFilters((f: any) => ({ ...f, category: e.target.value }))
                        }
                    />
                </div>

                {/* Min Price */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">Min Price (₹)</label>
                    <input
                        type="number"
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                        placeholder="0"
                        onChange={(e) =>
                            setFilters((f: any) => ({ ...f, minPrice: e.target.value }))
                        }
                    />
                </div>

                {/* Max Price */}
                <div className="flex flex-col">
                    <label className="text-xs text-gray-600 mb-1">Max Price (₹)</label>
                    <input
                        type="number"
                        className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                        placeholder="500"
                        onChange={(e) =>
                            setFilters((f: any) => ({ ...f, maxPrice: e.target.value }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}
