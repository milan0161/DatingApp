import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PhotoEditorProps = {
  photos: Photo[];
};

const PhotoEditor = ({ photos }: PhotoEditorProps) => {
  return (
    <div>
      <div>
        {photos.map((photo) => {
          return (
            <div className="w-fit" key={photo.id}>
              <img
                src={photo.url}
                alt=""
                className="border border-slate-300 p-1 rounded-xl"
              />
              <div className="flex items-center justify-center mt-2 gap-x-2">
                <button>Main</button>
                <button className="delete_photo_btn ">
                  <FontAwesomeIcon className=" text-white" icon={faTrash} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PhotoEditor;
