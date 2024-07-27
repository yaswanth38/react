
import React, { Component } from 'react'
import axios from "axios";
import { Box, Card, CardContent, Typography, CardActions, CardActionArea, CardMedia, CardHeader, Button, Grid } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Error, Favorite, FavoriteBorder, LocalParking } from "@material-ui/icons";


export class wishlist extends Component {
    // // constructor(props) {
    // //     super(props);
    // //     this.user = sessionStorage.getItem('user');

    //     this.state = {
    //         cards: [],
    //         successMsg: "",
    //         errorMsg: ""
    //     }
    // }
    state = {
        data: [],
        updateData: []
    }
    fetchData = () => {
        axios.get("http://localhost:5500/wishlists/?=userId=" + sessionStorage.getItem('useremail')).then((response) => {
            this.setState({ cards: response.data });
            console.log("response", response.data);
            for (let i = 0; i < this.state.cards.length; i++) {
                this.state.arr[i] = 0
            }
            console.log("arr: " + this.state.arr);
        }
        ).catch(
            (error) => { console.log("error", error) }
        );

    };

    componentDidMount() {
        // this.fetchData();
        this.setState({
            data: JSON.parse(localStorage.getItem('wishlist'))
        })
    }
    handleClick = (e) => {
        localStorage.setItem('property', JSON.stringify(e))
        this.props.history.push(`/property/${e.id}`)
    }

    wishcards = () => {
        return (
            <div>
                <Grid container spacing={3}>
                    {this.state.data !== undefined && this.state.data.map((cards, index) => {
                        return (
                            <Grid item md={4} key={index}>
                                <Card>
                                    <CardActionArea>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <CardHeader
                                                title={"Price: " + cards.price}
                                                subheader={"For " + cards.propertyType}

                                            // action={
                                            //     // <span style={{ position: "relative" }}><IconButton style={{ marginLeft: '100px' }}><HeartCheckbox /></IconButton></span>
                                            //     <div>
                                            //         <Checkbox onClick={() => this.wishlist(cards, index)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                            //     </div>
                                            // }

                                            />
                                            <IconButton>
                                                <span className='heart' onClick={() => {
                                                    this.state.updateData = this.state.data.filter((elem, ind) => {
                                                        if (index !== ind) {
                                                            return elem
                                                        }

                                                    })
                                                    localStorage.setItem('wishlist', JSON.stringify(this.state.updateData))
                                                    this.setState({
                                                        data: this.state.updateData
                                                    })
                                                }}>❤️</span>
                                            </IconButton>
                                        </div>
                                    </CardActionArea>
                                    < CardMedia
                                        component="img"
                                        image={`.${cards.imageUrls}`}
                                        style={{ aspectRatio: "16/9" }} >
                                    </CardMedia>
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {"Address:" + cards.address}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            color="primary"
                                            component={Link} to={"/explore/" + cards.propertyId}
                                        // onClick={() => {
                                        // this.props.history.push('/explore/' + cards.propertyId) }}
                                        >
                                            VIEW DETAIL
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </div>
        )
    };


    render() {
        // if (this.user != 0) {
        if (this.state.data.length > 0) {
            console.log('Inside if condistion');
            return (
                <>
                    <Typography style={{ color: 'black', textAlign: 'center', margin: '40px' }} variant='h4'>
                        Wishlist
                    </Typography>
                    {/* <Grid container spacing={4} > */}

                    {this.wishcards()}
                    {/* </Grid> */}
                </>
            )
        } else {
            console.log('Inside else condition');
            return (<div>
                <Grid item md={12} style={{ marginTop: "4%", paddingLeft: "25%", paddingRight: "25%" }}>
                    <Card >
                        <CardContent>
                            <Typography variant="h4" style={{ textAlignment: "center", color: "red" }} display="block" color="textPrimary">
                                {<Error severity="error" style={{ color: "red" }}></Error>} <br></br> No item added in the wishlist!!
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </div>)
        }
    }
}

export default wishlist