
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export default function ItemModal({ isOpen, onClose, onSubmit, initialData }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || { title: "", subtitle: "" },
  });

  useEffect(() => {
    if (isOpen) {
      reset(initialData || { title: "", subtitle: "" });
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const onSubmitForm = (data) => {
    onSubmit({
      title: data.title.trim(),
      subtitle: data.subtitle.trim(),
    });
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {initialData ? "Edit Item" : "Create New Item"}
        </h2>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 2, message: "At least 2 characters" },
                validate: {
                  notOnlyNumbers: (v) => !/^\d+$/.test(v.trim()) || "Cannot be just numbers",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              {...register("subtitle", {
                required: "Subtitle is required",
                minLength: { value: 3, message: "At least 3 characters" },
                validate: {
                  notOnlyNumbers: (v) => !/^\d+$/.test(v.trim()) || "Cannot be just numbers",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.subtitle && <p className="text-red-500 text-sm mt-1">{errors.subtitle.message}</p>}
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {initialData ? "Save Changes" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}