import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

const mockStoreItems = [
    { id: 1, name: 'Game Title 1', price: '50.29 €', stock: 'In Stock' },
    { id: 2, name: 'Game Title 2', price: '45.99 €', stock: 'Low in Stock' },
    { id: 3, name: 'Game Title 3', price: '30.00 €', stock: 'Not Available' },
];

const Store: React.FC = () => {
    return (
        <Box sx={{ padding: '2rem', backgroundColor: '#f0f4f8' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#4CAF50' }}>
                Store
            </Typography>
            <Typography align="center" sx={{ marginBottom: '2rem', color: '#555' }}>
                Explore and purchase games
            </Typography>
            <Grid container spacing={3}>
                {mockStoreItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card
                            sx={{
                                padding: '1rem',
                                backgroundColor: '#ffffff',
                                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography>Price: {item.price}</Typography>
                                <Typography color={item.stock === 'In Stock' ? 'green' : item.stock === 'Low in Stock' ? 'orange' : 'red'}>
                                    {item.stock}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: '1rem' }}
                                    disabled={item.stock === 'Not Available'}
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Store;
