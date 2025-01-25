import "./Landing.css";
("use client");
import {LandingNav} from '../../Components/LandingNav/LandingNav'
import House from "../../assets/HeroHouse.png";
import manuel from "../../assets/manuel.jpg";
import { Box, Typography } from "@mui/material";
import { TestimonialCard } from "../../Components/LandingComp/Testimonial-card";
import { Feedback } from "../../Components/LandingComp/Feedback";
import { SearchSection } from "../../Components/LandingComp/Search-section";
import { StatsCard } from "../../Components/LandingComp/Stats-card";
import { OffersSection } from "../../Components/LandingComp/Offers-section";

const Landing = () => {
  return (
    <div>
    <LandingNav />
    <div className="cx">
    
      <Box
        sx={{
          background: "linear-gradient(180deg, #E0EFFF,#E0DEF700)",
          display: "flex",
          minHeight: "100vh",
          py: 8,
          position: "relative",
          padding: " 3rem",
          paddingTop: "3rem"
        }}
      >
        <Box sx={{ flex: 1, pr: 4 }}>
          <Typography variant="h1" gutterBottom sx={{
          background: 'linear-gradient(to right, #000305, #2D90FB)', // Gradient colors
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',   
          fontWeight: 'bold', // Optional
          fontFamily: '"Changa", "Roboto", "Arial", sans-serif',
          textAlign: 'start'}}>
            Buy, <span style={{ color: "#1976d2" }}>rent</span>, or sell your
            property easily
          </Typography>
          <Typography variant="h5" color="text.secondary">
            A great platform to buy, sell, or even rent your properties without
            any commisions.
          </Typography>

          <SearchSection />

          <Box sx={{ display: "flex", gap: 4, mt: 6 }}>
            <StatsCard
              icon="people"
              count="50k+"
              text="believe in our service"
            />
            <StatsCard
              icon="home"
              count="10k+"
              text="properties ready for occupancy"
            />
          </Box>
        </Box>

        <Box sx={{ flex: 1 , position: "relative" }}>
          <Box
            component="img"
            src={House}
            alt="Modern house"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
          <TestimonialCard
            name="Manuel Villa"
            agency="Certified Agency"
            comment="I loved how smooth the move was, and finally got the house we wanted."
            image={manuel}
          />
          <Feedback />
        </Box>
      </Box>
      <OffersSection />
    </div>
    </div>
  );
};
export default Landing;
