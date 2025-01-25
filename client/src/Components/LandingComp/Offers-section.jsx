'use client'

import { Box, Typography, Grid, Tabs, Tab, Button } from '@mui/material'
import { useState } from 'react'
import { PropertyCard } from './Property-card'
import { Key, Store, Sell } from '@mui/icons-material'
import Messi from '../../assets/CardHouse.png'  

export function OffersSection() {
    const rentProperties = Array(6).fill({
        price: '10,000',
        title: 'Messi House',
        location: 'Miami',
        beds: 3,
        baths: 2,
        area: '5x7',
        image: Messi
      })
    
      const buyProperties = Array(6).fill({
        price: '500,000',
        title: 'Luxury Villa',
        location: 'Beverly Hills',
        beds: 5,
        baths: 4,
        area: '15x20',
        image: Messi,
      })

      const [tabIndex, setTabIndex] = useState(0) // Default to "Rent"
      const [properties, setProperties] = useState(rentProperties)
    
      const handleTabChange = (_, newIndex) => {
        setTabIndex(newIndex)
    
        // Update properties based on selected tab
        if (newIndex === 0) setProperties(rentProperties)
        else if (newIndex === 1) setProperties(buyProperties)
      }


  return (
    <Box sx={{ py: 8, padding: " 3rem", paddingTop: "3rem" }}>
      <Typography 
        variant="h2" 
        align="center" 
        sx={{ 
          color:'linear-gradient(to right, #000305, #2D90FB)',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        Not To Miss <span className="highlight">Offers</span>
      </Typography>
      <Typography 
        variant="body1" 
        align="center" 
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Some of our picked properties & best offers
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              minWidth: 120,
              color: 'text.secondary',
            },
            '& .Mui-selected': {
              color: '#1976d2',
            }
          }}
        >
          <Tab icon={<Key />} label="Rent" />
          <Tab icon={<Store />} label="Buy" />
          <Tab icon={<Sell />} label="Sell" />
        </Tabs>
      </Box>

      <Grid container spacing={3}>
        {properties.map((property, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <PropertyCard {...property} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="warning"
          sx={{
            textTransform: 'none',
            bgcolor: '#FF6600', // Orange background color
            '&:hover': {
              bgcolor: '#ff6800 ' // Darker orange on hover
            },
            py: 1.5,
            px: 4,
            mt: 2, // Margin-top to create space between the cards and button
          }}
        >
          Browse Other Properties
        </Button>
      </Box>   
    </Box>
  )
}
