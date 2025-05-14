import CategoryManagement from "@/components/organisms/CategoryManagement";

const CategoriesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Categories Management</h1>
      </div>
      <CategoryManagement />
    </div>
  );
};

export default CategoriesPage;
