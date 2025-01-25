"use client";
import './filters-sidebar.css'
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Button,
  Slider,
  FormGroup,
  Radio,
  RadioGroup,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";

export function FiltersSidebar() {
  return (
    <Box sx={{ width: 280, pr: 3 }}>
      {/* Location Filters */}
      <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        placeholder="El Bordj Ya Dawla"
        InputProps={{
        startAdornment: (
            <InputAdornment position="start">
            <LocationOn sx={{ color: 'text.secondary', mr: 1 }} />
        </InputAdornment>
    ),
  }}    
  sx={{ mb: 2 }}
/>

        <TextField
          fullWidth
          placeholder="Amizour Ya Dawla"
          InputProps={{
            startAdornment: (
              <LocationOn sx={{ color: "text.secondary", mr: 1 }} />
            ),
          }}
        />
      </Box>

      {/* Need to */}
      <Box sx={{ mb: 4}}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Need to
        </Typography>
        <RadioGroup row defaultValue="all">
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="rent" control={<Radio />} label="Rent" />
          <FormControlLabel value="buy" control={<Radio />} label="Buy" />
        </RadioGroup>
      </Box>

      {/* Type of Place */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Type of Place
        </Typography>
        <FormGroup>
        <div className='properties-type'>
        <div className='properties-type1'>
        <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="all"
        />
          <FormControlLabel
            control={<Checkbox />}
            label="Villa"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Appartement"
          />
          <FormControlLabel
            control={<Checkbox />}
            label="Studio"
          />
          </div>
          <div className="properties-type2">
          <FormControlLabel
            control={<Checkbox />}
            label="Terrain"
          />
          <FormControlLabel control={<Checkbox />} label="Niveau de Villa" />
          <FormControlLabel control={<Checkbox />} label="Hangar" />
          </div>
          </div>
        </FormGroup>
      </Box>

      {/* Price Range */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Price Range
        </Typography>
        <Slider
          defaultValue={[500, 10000]}
          min={0}
          max={100000}
          valueLabelDisplay="auto"
          sx={{ color: "#1976d2" }}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="body2" color="text.secondary">
            0DA
          </Typography>
          <Typography variant="body2" color="text.secondary">
            100000DA
          </Typography>
        </Box>
      </Box>

      {/* Size */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Size
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Min" size="small" sx={{ width: "50%" }} />
          <TextField label="Max" size="small" sx={{ width: "50%" }} />
        </Box>
      </Box>

      {/* Features */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Features
        </Typography>
        <FormGroup>
        <div className='properties-type'>
        <div className='properties-type1'>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="AC & Heating"
          />
          <FormControlLabel control={<Checkbox />} label="Clubhouse" />
          <FormControlLabel control={<Checkbox />} label="Dishwasher" />
          <FormControlLabel control={<Checkbox />} label="Spa" />
          </div>
          <div className='properties-type2'>
          <FormControlLabel control={<Checkbox />} label="Balcony" />
          <FormControlLabel control={<Checkbox />} label="Pool" />
          <FormControlLabel control={<Checkbox />} label="Fitness Center" />
          <FormControlLabel control={<Checkbox />} label="Valet Parking" />
          </div>
          </div>
        </FormGroup>
      </Box>

      {/* Papers */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
          Papers
        </Typography>
        <FormGroup>
        <div className='properties-type'>
        <div className='properties-type1'>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Permis de construire"
          />
          <FormControlLabel control={<Checkbox />} label="Livret foncier" />
          </div>
          <div className='properties-type2'>
          <FormControlLabel control={<Checkbox />} label="Act notarier" />
          <FormControlLabel control={<Checkbox />} label="Decision" />
          </div>
          </div>
        </FormGroup>
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#FF6600", "&:hover": { bgcolor: "#FF6800" } }}
        >
          Apply Filters
        </Button>
        <Button variant="contained" fullWidth
        sx={{ bgcolor: "#FF6600", "&:hover": { bgcolor: "#FF6800" } }}>
          Apply Notifications
        </Button>
      </Box>
    </Box>
  );
}
