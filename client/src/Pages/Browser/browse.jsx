'use client'
import { LandingNav } from '../../Components/LandingNav/LandingNav'
import { Box, Container, Grid2 } from '@mui/material'
import { FiltersSidebar } from '../../Components/filters-sidebar'
import { PropertyCard } from '../../Components/LandingComp/Property-card'
import Messi from '../../assets/CardHouse.png'

export default function BrowsePage() {
  // Sample properties data
  const properties = Array(12).fill({
    price: '2,095',
    title: 'Palm Harbor',
    location: '2699 Green Valley, Highland Lake, FL',
    beds: 3,
    baths: 2,
    area: '5x7',
    image: Messi
  })

  return (
    <div>
    <LandingNav />
    <Container maxWidth="xl" sx={{ py:15, background:'linear-gradient(180deg, #E0EFFF,#E0DEF700)'} }>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Filters Sidebar */}
        <Box sx={{ display: { xs: 'none', md: 'block', marginLeft:20 } }}>
          <FiltersSidebar />
        </Box>

        {/* Properties Grid */}
        <Box sx={{ flex: 1 , marginLeft:15}}>
          <Grid2 container spacing={3}>
            {properties.map((property, index) => (
              <Grid2 item xs={12} sm={6} lg={6} key={index}>
                <PropertyCard {...property} />
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
    </Container>
    </div>
  )
}