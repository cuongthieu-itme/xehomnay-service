import { Button } from "@mantine/core";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetOptions,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
interface Props {
  onUpload: (
    result: CloudinaryUploadWidgetResults,
    widget: any
  ) => Promise<void> | undefined;
  options?: CloudinaryUploadWidgetOptions;
}

export default function Uploader({ onUpload, options }: Props) {
  const defaultOptions: CloudinaryUploadWidgetOptions = {
    sources: ["local"],
    multiple: false,
    maxFiles: 1,
    singleUploadAutoClose: true,
    showPoweredBy: false,
    folder: "carrental",
    ...options,
  };
  return (
    <>
      <CldUploadWidget
        // uploadPreset="carrental"
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(result, { widget }) => onUpload(result, widget)}
        onQueuesEnd={(result, { widget }) => widget.close()}
        options={defaultOptions}
      >
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            open();
          }
          return (
            <Button variant="outline" onClick={handleOnClick}>
              Tải ảnh lên
            </Button>
          );
        }}
      </CldUploadWidget>
    </>
  );
}
