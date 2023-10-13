import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PhotoUploadForm from '../../common/forms/PhotoUploadForm';
import {
  useDeletePhotoMutation,
  useSetMainPhotoMutation,
} from '../api/membersApi';

import {
  showApiError,
  showError,
  showSucces,
} from '../../../app/utils/ToastMsg';
import { saveMainImgUrl } from '../../../app/utils/saveToken';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import { setMainPhoto } from '../../account/state/accountSlice';
import LoadingSpinner from '../../common/UI/LoadingSpinner';
import { decodedAToken } from '../../../app/utils/decodeTokens';

type PhotoEditorProps = {
  photos: Photo[];
};

const PhotoEditor = ({ photos }: PhotoEditorProps) => {
  const token = useAppSelector((state) => state.account.user.token);
  const dispatch = useAppDispatch();
  const [setMPhoto, { isLoading }] = useSetMainPhotoMutation();
  const [deletePhoto, { isLoading: isLoad }] = useDeletePhotoMutation();
  if (isLoading || isLoad) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-10">
        {photos.map((photo) => {
          return (
            <div className="w-fit " key={photo.id}>
              <img
                src={photo.url}
                loading="lazy"
                alt=""
                className="border border-slate-300 p-1 rounded-xl w-32 h-32"
              />
              <div className="flex items-center justify-center mt-2 gap-x-2">
                <button
                  className="disabled:text-slate-300"
                  disabled={photo.isMain}
                  onClick={() => {
                    if (photo.isMain == true) {
                      return showError('This Photo is Main photo already.');
                    }
                    setMPhoto(photo.id)
                      .unwrap()
                      .then(() => {
                        const decodedToken = decodedAToken(token);
                        saveMainImgUrl(photo.url, decodedToken!.exp);
                        dispatch(setMainPhoto(photo.url));
                        showSucces(
                          'You have successfully changed your profile picture',
                        );
                      })
                      .catch((err) => {
                        showApiError(err);
                      });
                  }}
                >
                  {photo.isMain ? 'Main' : 'Other'}
                </button>
                <button
                  disabled={photo.isMain}
                  onClick={() => {
                    deletePhoto(photo.id)
                      .unwrap()
                      .then(() => {
                        showSucces(
                          'You have successfully changed your profile picture',
                        );
                      })
                      .catch((err) => {
                        console.log(err.data);
                        showApiError(err);
                      });
                  }}
                  className="delete_photo_btn "
                >
                  <FontAwesomeIcon className=" text-white" icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <PhotoUploadForm />
    </div>
  );
};

export default PhotoEditor;
