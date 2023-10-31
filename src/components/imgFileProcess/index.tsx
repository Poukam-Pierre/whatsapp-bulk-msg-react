// Made by Poukam Pierre

import { Box, Button, IconButton, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import { sendingFile, uploadError } from "../sendingTest";
import { VisuallyHiddenInput } from "../excel_csvFileProcess";

function ImgFileProcess({
  sendingFile,
  setSendingFile,
  setUploadError,
  setOpen,
}: {
  sendingFile: sendingFile | undefined;
  setSendingFile: React.Dispatch<React.SetStateAction<sendingFile>>;
  setUploadError: React.Dispatch<React.SetStateAction<uploadError | undefined>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const photoUpload = (e: any) => {
    const reader = new FileReader();
    const File = e.target.files[0];
    let fileTypes = ["image/jpeg", "image/png"];
    if (File && fileTypes.includes(File.type)) {
      reader.onloadend = () => {
        setSendingFile({ ...sendingFile, file: File });
      };
      reader.readAsDataURL(File);
      setUploadError({
        severity: "success",
        titleAlert: "Success",
        text: "Image has been correctly upload",
      });
      setOpen(true);
    } else {
      setUploadError({
        severity: "error",
        titleAlert: "Error",
        text: "Please select only jpeg or png image types",
      });
      setOpen(true);
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <Button htmlFor="file" component="label">
        <IconButton color="primary">
          <ImageIcon />
        </IconButton>
        <VisuallyHiddenInput
          type="file"
          id="file"
          onChange={(e) => photoUpload(e)}
        />
        <Typography variant="caption">Select image</Typography>
      </Button>
    </Box>
  );
}

export default ImgFileProcess;
