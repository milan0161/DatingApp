import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useRef } from 'react';
import { useAddPhotoMutation } from '../../members/api/membersApi';
import { showError } from '../../../app/utils/ToastMsg';
import LoadingSpinner from '../UI/LoadingSpinner';
import { saveMainImgUrl } from '../../../app/utils/saveToken';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import { decodedAToken } from '../../../app/utils/decodeTokens';
import { setMainPhoto } from '../../account/state/accountSlice';

const PhotoUploadForm = () => {
  const fileInputField = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>();
  const [isHover, setIsHover] = useState(false);
  const token = useAppSelector((state) => state.account.user.token);
  const dispatch = useAppDispatch();
  const [addPhoto, { isLoading }] = useAddPhotoMutation();

  const dragPhotoHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsHover(true);
  };

  const dropPhotoHandler = (e: any) => {
    e.preventDefault();
    setIsHover(false);
    setFiles(e.dataTransfer.files);
  };
  let fileNames;
  if (files)
    fileNames = (
      <div className="ml-10">
        <ul className="">
          {Array.from(files).map((file) => {
            return (
              <li className="my-2" key={file.name}>
                <p>
                  <strong>Image name:</strong> {file.name}
                </p>
                <hr className="border border-slate-400 my-2" />
                <p>
                  <strong>Size: </strong>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );

  const clearFormHandler = () => {
    setFiles(null);
  };

  const addPhotoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (files) {
      fileInputField.current!.files = files!;
    } else {
      showError('Please provide picture before submitting');
      return;
    }
    const formData = new FormData(e.currentTarget);

    if (files.length > 1) {
      showError('You can upload only one photo at a time');
      return;
    }

    // for (const value of formData.values()) {
    //   console.log(value);
    // }

    addPhoto(formData)
      .unwrap()
      .then((photo) => {
        if (photo.isMain) {
          const exp = decodedAToken(token)?.exp;
          saveMainImgUrl(photo.url, exp!);
          dispatch(setMainPhoto(photo.url));
        }
      })
      .catch();
  };
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="flex flex-col gap-y-5 mt-10">
      <div className="flex flex-row">
        <div
          onDragLeave={(e) => {
            e.preventDefault();
            setIsHover(false);
          }}
          onDragOver={dragPhotoHandler}
          onDrop={dropPhotoHandler}
          className={
            isHover
              ? 'border rounded-xl flex flex-col items-center justify-center w-64 h-64 gap-y-2 mb-2 duration-150 border-red-600 border-dotted scale-110'
              : 'border border-slate-300 rounded-xl flex flex-col items-center justify-center w-64 h-64 gap-y-2 mb-2 duration-150'
          }
        >
          <FontAwesomeIcon size="2x" icon={faFileUpload} />
          <h1>Drop photo here</h1>

          <button
            type="button"
            className="border border-slate-300 rounded px-2 py-1"
            onClick={() => fileInputField.current?.click()}
          >
            Or Click Here
          </button>
        </div>
        <div>{fileNames}</div>
      </div>
      <form onSubmit={addPhotoHandler} className=" text-center">
        <input
          ref={fileInputField}
          name="file"
          type="file"
          onChange={(e) => setFiles(e.target.files!)}
          accept="images/*"
          hidden
        />
        <button
          type="submit"
          className=" px-2 w-36 bg-orange-600 text-white rounded py-1 border border-white hover:border-orange-600 hover:text-orange-600 hover:bg-white duration-200 mr-2"
        >
          Upload
        </button>
        <button
          onClick={clearFormHandler}
          type="button"
          className=" px-2 w-36 bg-red-600 text-white rounded py-1 border border-white hover:border-red-600 hover:text-red-600 hover:bg-white duration-200"
        >
          Clear
        </button>
      </form>
    </section>
  );
};

export default PhotoUploadForm;
