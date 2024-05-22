import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, GitHub } from "@mui/icons-material";
import { Box } from "@mui/material";

const TikTokIcon = ({ color = "#000000" }) => {
return (
        <svg
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        width="25px"
        height="25px"
        >
        <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z" />
        </svg>
    );
};

export default function Footer() {
    return (
        <Box
        component="footer"
        style={{ marginTop: "auto", textAlign: "center", padding: "10px" }}
        >
        <Container maxWidth="lg">
            <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Acerca de nosotros
                </Typography>
                <Typography variant="body2" color="text.secondary">
                En gestProy nos preocupa tu organizacion
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Contactanos
                </Typography>   
                <Typography variant="body2" color="text.secondary">
                Email: gestProy@gmail.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Phone: +51 978 647 376
                </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                Siguenos
                </Typography>
                <Link href="https://www.facebook.com/" target="_blank" color="inherit"
                sx={{ pl: 1, pr: 1 }}>
                <Facebook />
                </Link>
                <Link
                href="https://www.instagram.com/" target="_blank" color="inherit"
                sx={{ pl: 1, pr: 1 }}
                >
                <Instagram />
                </Link>
                <Link href="https://www.tiktok.com/" target="_blank" color="inherit"
                sx={{ pl: 1, pr: 1 }}
                >
                <TikTokIcon />
                </Link>
                <Link href="https://github.com/L-FER-GT" target="_blank" color="inherit"
                sx={{ pl: 1, pr: 1 }}
                >
                <GitHub />
                </Link>
            </Grid>
            </Grid>
            <Box mt={5}>
            <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                <Link color="inherit" target="_blank" href="https://your-website.com/">
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
            </Typography>
            </Box>
        </Container>
        </Box>
    );
}