'use client'

import { Box, Tab, Tabs, TextField, Button, Autocomplete } from '@mui/material'
import { useState } from 'react'

const cities = [{ label: 'Barcelona, Spain' }, { label: 'Madrid, Spain' }, { label: 'Valencia, Spain' }]

export function SearchSection() {
const [value, setValue] = useState(0)

return (
    <Box sx={{ mt: 4 }}>
    <Tabs value={value} onChange={(_, newValue) => setValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Rent" />
        <Tab label="Buy" />
        <Tab label="Sell" />
    </Tabs>
    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
        options={cities}
        renderInput={(params) => <TextField {...params} label="Location" fullWidth />}
        sx={{ width: 300 }}
        />
        <TextField type="date" label="Move-in Date" InputLabelProps={{ shrink: true }} sx={{ width: 200 }} />
    </Box>
    <Button variant="contained" size="large">
        Browse Properties
    </Button>
    </Box>
)
}