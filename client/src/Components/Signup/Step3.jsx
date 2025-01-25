import { useState } from "react"
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  RadioGroup,
  Radio,
  FormControlLabel,
  MenuItem,
  IconButton,
  Paper,
  Select,
  Link as MuiLink,
} from "@mui/material"
import { ArrowBack, AddPhotoAlternate } from "@mui/icons-material"
import Link from "next/link"
import { useRouter } from "next/navigation"


const Step3 = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
      
      const userTypes = ["Individual", "Store"]
      
      export default function SignupStep2() {
        const router = useRouter()
        const [formData, setFormData] = useState({
          userType: "Individual",
          name: "",
          day: "",
          month: "",
          year: "",
          gender: "Woman",
          phone: "",
          profilePicture: null,
        })
      
        const [previewUrl, setPreviewUrl] = useState(null)
      
        const handleInputChange = (e) => {
          const { name, value } = e.target
          setFormData((prev) => ({
            ...prev,
            [name]: value,
          }))
        }
      
        const handleImageUpload = (e) => {
          const file = e.target.files[0]
          if (file) {
            setFormData((prev) => ({
              ...prev,
              profilePicture: file,
            }))
            setPreviewUrl(URL.createObjectURL(file))
          }
        }
      
        const handleSubmit = (e) => {
          e.preventDefault()
          router.push("/signup/step3")
        }

  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <Link href="/signup/step1" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton>
              <ArrowBack />
            </IconButton>
          </Link>
          <Box sx={{ ml: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Step 2 of 3
            </Typography>
            <Typography variant="h6">Tell us about you</Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              I'm using this platform as
            </Typography>
            <Select
              fullWidth
              name="userType"
              value={formData.userType}
              onChange={handleInputChange}
              sx={{ bgcolor: "background.paper" }}
            >
              {userTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 3 }}
          />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Date of birth
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField label="Day" name="day" value={formData.day} onChange={handleInputChange} sx={{ width: "20%" }} />
            <Select value={formData.month} name="month" onChange={handleInputChange} displayEmpty sx={{ width: "50%" }}>
              <MenuItem value="">Month</MenuItem>
              {months.map((month) => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
            <TextField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              sx={{ width: "30%" }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Gender
          </Typography>
          <RadioGroup row name="gender" value={formData.gender} onChange={handleInputChange} sx={{ mb: 3 }}>
            <FormControlLabel value="Man" control={<Radio />} label="Man" />
            <FormControlLabel value="Woman" control={<Radio />} label="Woman" />
          </RadioGroup>

          <TextField
            fullWidth
            label="Phone number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: <Typography sx={{ color: "text.secondary", mr: 1 }}>+213</Typography>,
            }}
            sx={{ mb: 3 }}
          />

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Profile Picture
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              mb: 3,
              textAlign: "center",
              cursor: "pointer",
              borderStyle: "dashed",
            }}
            onClick={() => document.getElementById("profile-picture-input").click()}
          >
            {previewUrl ? (
              <Box
                component="img"
                src={previewUrl}
                alt="Profile preview"
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box sx={{ color: "text.secondary" }}>
                <AddPhotoAlternate sx={{ fontSize: 40, mb: 1 }} />
                <Typography>Add Profile Picture</Typography>
              </Box>
            )}
            <input
              type="file"
              id="profile-picture-input"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </Paper>

          <Button
            fullWidth
            variant="contained"
            size="large"
            type="submit"
            sx={{
              bgcolor: "#ff4d4f",
              "&:hover": { bgcolor: "#ff7875" },
              mb: 2,
            }}
          >
            Next
          </Button>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Why do we need to know?{" "}
              <MuiLink href="#" underline="always">
                learn more here
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Box>
    </Container>
  )
}
}
export default Step3