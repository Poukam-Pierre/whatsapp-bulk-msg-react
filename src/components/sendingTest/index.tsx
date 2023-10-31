// Made by Poukam Pierre

import { Box, TextField, Typography, Divider, Button } from "@mui/material";
import { SetStateAction, useState } from "react";
import Excel_csvFile from "../excel_csvFileProcess";
import ImgFileProcess from "../imgFileProcess";
import Picker, { EmojiClickData } from "emoji-picker-react";
import Alert, { AlertColor } from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import Axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import QRCode from "qrcode.react";
// const wbm = require("wbm");

interface uploadFile {
  name: string;
  file: any;
}
export interface sendingFile {
  excel_csvFile?: uploadFile;
  file?: string;
  text?: string;
}

export interface uploadError {
  severity: AlertColor | undefined;
  titleAlert: string;
  text: string;
}

function SendingTest() {
  const [uploadError, setUploadError] = useState<uploadError>();
  const [sendingFile, setSendingFile] = useState<sendingFile>({
    text: "",
  });
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleTypeText = (emojoObject: EmojiClickData, event: MouseEvent) => {
    setSendingFile((prevInput) => ({
      ...sendingFile,
      text: prevInput.text + emojoObject.emoji,
    }));
    setShowPicker(false);
  };

  //   const handleSend = () => {
  //     console.log(sendingFile);
  //     //   const phones = sendingFile.excel_csvFile?.file.map(
  //     //     (element: { Phone: string }) => `+${element.Phone}`
  //     //   );

  //     //   wbm
  //     //     .start({ qrCodeData: true, session: false, showBrowser: false })
  //     //     .then(async (qrCodeData: SetStateAction<string | undefined>) => {
  //     //       setQrCode(qrCodeData);
  //     //       await wbm.waitQRCode();
  //     //       await wbm.send(phones, sendingFile.text as string);
  //     //       await wbm.end();
  //     //     })
  //     //     .catch((err: any) => {
  //     //       if (err) {
  //     //         console.error("Error while send :", err);
  //     //       }
  //     //     });
  //   };

  const handleSend = () => {
    setLoading(true);
    const body = new FormData();
    body.append("file", sendingFile.file as string);
    body.append("excel_csvFile", JSON.stringify(sendingFile.excel_csvFile));
    body.append("text", sendingFile.text as string);
    Axios.post(
      `${process.env.REACT_APP_URL_REMOTE_LINK}/sendMessages/whatsapp`,
      body
    )
      .then((res) => {
        if (res.status === 201) {
          setQrCode(res.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setUploadError({
            severity: "error",
            titleAlert: "Error",
            text: err.response.message,
          });
          setOpen(true);
        }
      });
  };
  return (
    <>
      <Collapse in={open}>
        <Alert severity={uploadError?.severity} onClose={() => setOpen(false)}>
          <AlertTitle>{uploadError?.titleAlert}</AlertTitle>
          {uploadError?.text}
        </Alert>
      </Collapse>
      <Box display="flex" alignItems="center" justifyContent="space-evenly">
        <Excel_csvFile
          sendingFile={sendingFile}
          setSendingFile={setSendingFile}
          setUploadError={setUploadError}
          setOpen={setOpen}
        />
        <ImgFileProcess
          sendingFile={sendingFile}
          setSendingFile={setSendingFile}
          setUploadError={setUploadError}
          setOpen={setOpen}
        />
      </Box>
      <Box margin="15px 0 15px" display="flex" position="relative">
        <TextField
          id="outlined-multiline-flexible"
          label="Texte"
          multiline
          fullWidth
          rows={8}
          value={sendingFile?.text}
          onChange={(e) =>
            setSendingFile({ ...sendingFile, text: e.target.value })
          }
        />
        <Box sx={{ position: "absolute", right: "10px", top: "10px" }}>
          <Box
            component="img"
            src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg"
            onClick={() => setShowPicker((val) => !val)}
            sx={{ cursor: "pointer", display: showPicker ? "none" : "initial" }}
          />
          {showPicker && <Picker onEmojiClick={handleTypeText} />}
        </Box>
      </Box>
      <Button
        component="label"
        variant="contained"
        startIcon={<SendIcon />}
        onClick={handleSend}
      >
        Start diffusion
      </Button>
      {!loading && qrCode && (
        <Box marginTop="15px" display="grid" gap="15px">
          <Divider />
          <Typography>
            Scanning QR code using whatsapp App. Don't be late to scan it!!!
          </Typography>
          <QRCode value={qrCode} />
        </Box>
      )}
      {loading && (
        <Box sx={{ width: "100%", marginTop: "15px" }}>
          <LinearProgress />
        </Box>
      )}
    </>
  );
}

export default SendingTest;
