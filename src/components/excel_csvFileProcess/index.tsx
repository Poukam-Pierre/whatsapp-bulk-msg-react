// Made by Poukam pierre

import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { sendingFile, uploadError } from "../sendingTest";
import * as XLSX from "xlsx";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Excel_csvFile({
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
  const handleFile = (e: any) => {
    let selectedFile = e.target.files[0];
    let fileTypes = [
      "application/vnd.ms-excel",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: "buffer" });
        const workSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[workSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setSendingFile({
          ...sendingFile,
          excel_csvFile: {
            name: selectedFile.name,
            file: data,
          },
        });
        setUploadError({
          severity: "success",
          titleAlert: "Success",
          text: "File has been correctly upload",
        });
        setOpen(true);
      };
    } else {
      setUploadError({
        severity: "error",
        titleAlert: "Error",
        text: "Please select only excel or csv file types",
      });
      setOpen(true);
    }
  };
  return (
    <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Select file
      <VisuallyHiddenInput type="file" onChange={handleFile} />
    </Button>
  );
}

export default Excel_csvFile;
