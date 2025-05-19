import CategoryManagement from "@/components/organisms/CategoryManagement";

const CategoriesPage = () => {
  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold text-slate-900">Categories Management</h1>
      </div>
      <CategoryManagement />
    </div>
  );
};

export default CategoriesPage;
