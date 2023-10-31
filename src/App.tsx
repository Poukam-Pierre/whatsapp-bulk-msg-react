import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import send_msg_img from "./asset/marketing, communication _ broadcast, message, promotion, ad, advertisement, pr_md.webp";

function App() {
  return (
    <Box display="grid" padding="20px" gridTemplateColumns="1.5fr 2fr">
      <Box display="grid" gap="20px">
        <Typography
          variant="h2"
          fontFamily="Inter"
          fontWeight="400"
          fontSize="30px"
        >
          Envoyez vos messages personnalisés en toute simplicité via whatsApp.
        </Typography>
        <Grid item spacing={2}>
          <Typography variant="h5" fontWeight="500">
            Comment ça marche?
          </Typography>
          <Box>
            <List sx={{ listStyle: "decimal", pl: 4 }}>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText
                  primary="Charger les contacts"
                  secondary="Charger les contacts depuis un ficher excel ou CSV. Le fichier excel doit avoir une colonne nommée phone ou téléphone."
                />
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText
                  primary="Personnaliser le message à diffuser. Il est possible d'associer les images."
                  secondary="Personnaliser vos messages en saisissant le text ou en important une image depuis le local de votre choix dans votre machine."
                />
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText
                  primary="Valider l'envoie du personne à tous les contacts"
                  secondary="Valider l'envoie en appuyant sur le boutton envoie."
                />
              </ListItem>
              <ListItem sx={{ display: "list-item" }}>
                <ListItemText
                  primary="Scanner le QR code avec le whatsApp téléphone actif qui sera l'auteur de la diffusion."
                  secondary="Après validation un QR code s'affichera. Le scanner grâce à l'application whatSapp du téléphone qui sera l'auteur de la diffusion."
                />
              </ListItem>
            </List>
          </Box>
        </Grid>
      </Box>
      <Box
        component="img"
        src={send_msg_img}
        alt="brodcast send"
        sx={{
          justifySelf: "center",
          width: "40%",
          alignSelf: "center",
          paddingTop: { xs: 3, sm: 0 },
        }}
      />
    </Box>
  );
}

export default App;
