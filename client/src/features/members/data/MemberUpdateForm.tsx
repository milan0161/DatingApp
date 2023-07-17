import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { showSucces } from "../../../app/utils/ToastMsg";

type UpdateMemberFormProps = {
  introduction: string;
  lookingFor: string;
  interests: string;
  city: string;
  country: string;
  onChange: (isDirty: boolean) => void;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateMemberForm = ({
  city,
  country,
  interests,
  introduction,
  lookingFor,
  onChange,
  setIsDirty,
}: UpdateMemberFormProps) => {
  const {
    formState: { isDirty },
    register,
    handleSubmit,
  } = useForm<FormInput>({
    defaultValues: {
      city,
      country,
      interests,
      introduction,
      lookingFor,
    },
  });
  useEffect(() => {
    onChange(isDirty);
  }, [isDirty]);

  const updateMemberHandler = (data: FormInput) => {
    showSucces("You have succesfully updated informations.");
    setIsDirty(false);
    console.log(data);
  };

  return (
    <form id="editForm" onSubmit={handleSubmit(updateMemberHandler)}>
      <h4 className="text-[30px] text-bold mb-4">Description</h4>
      <textarea
        className="w-full border border-slate-300 rounded p-2"
        rows={6}
        {...register("introduction")}
      ></textarea>
      <h4 className="text-[30px] text-bold mb-4">Looking for</h4>
      <textarea
        className="w-full border border-slate-300 rounded p-2"
        rows={6}
        {...register("lookingFor")}
      ></textarea>
      <h4 className="text-[30px] text-bold mb-4">Interests</h4>
      <textarea
        className="w-full border border-slate-300 rounded p-2"
        rows={6}
        {...register("interests")}
      ></textarea>
      <h4 className="text-[30px] text-bold mb-4">Location Details</h4>
      <div className="flex items-center gap-x-4">
        <label htmlFor="city">City:</label>
        <input
          className="border border-slate-300 rounded p-2"
          type="text"
          {...register("city")}
          id="city"
        />
        <label htmlFor="country">Country:</label>
        <input
          className=" border border-slate-300 rounded p-2"
          type="text"
          {...register("country")}
          id="country"
        />
      </div>
    </form>
  );
};
export default UpdateMemberForm;
