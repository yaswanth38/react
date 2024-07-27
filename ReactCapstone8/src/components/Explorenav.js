import React from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Checkbox from "@material-ui/core/Checkbox";
import { CardContent, Typography, CardActions, CardActionArea, CardMedia, Card, CardHeader } from "@material-ui/core";
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';

function handleShareClick() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            url: window.location.href
        })
            .then(() => console.log('shared'))
            .catch((error) => console.log('Error'));
    } else {
        console.log('Share not supported');
    }
}

export default class Explorenav extends React.Component {
    para = new URLSearchParams(window.location.search)
    searchTerm = this.para.get("searchTerm")
    searchPro = []

    wishlistItems = JSON.parse(sessionStorage.getItem('wishlist')) || []
    constructor(props) {
        super(props);
        this.state = {
            PropertyArray: [],
            arr: [],
            successMessage: "",
            Errormsg: "",
        }
    }

    getAllProperties = () => {
        axios.get("http://localhost:5500/explore").then((response) => {
            this.setState({
                PropertyArray: response.data,
                successMsg: "Data Added Successfully",
            })
            for (let i = 0; i < this.state.PropertyArray.length; i++) {
                this.state.arr[i] = false
            }
        }).catch((error) => {
            this.setState({
                errorMessage: error.response.data
            })
        })
    }

    wishlist = async (v, index) => {
        if (sessionStorage.getItem('useremail')) {
            console.log("hello", v.propertyId, index);
            let ob = {
                cardobj: v,
                userId: sessionStorage.getItem('useremail')
            }
            console.log(
                "object is:", ob
            );
        }
        else {
            window.alert("Please Login to Wishlist!!");
            window.location.href = "http://localhost:3000/login";
        }
    }

    searchproperty = () => {
        const search = this.state.PropertyArray.filter((data) => {
            const pattern = new RegExp(this.searchTerm, "gi")
            if (pattern.test(data.address)) {
                return true;
            } else {
                return false
            }
        })
        this.searchPro = search
    }
    componentDidMount() {
        this.getAllProperties();
    }


    getSearch() {
        axios.get(`http://localhost:5500/exploresearch?searchTerm=${this.searchTerm}`)
            .then((response) => {
                this.setState({
                    searchPro: response.data.data,
                    searchMessage: response.data.message,
                    successMsg: "Data Added Successfully",
                });
            })
            .catch((error) => {
                this.setState({
                    errorMsg: error.response,
                });
            });
    }

    displaysearched = () => {
        return (
            <Grid container spacing={2}>
                {this.searchPro.map((property, index) => {
                    return (
                        <Grid item md={4} key={index}>
                            <Card style={{ width: "370px", height: "420px" }} spacing={2}>
                                <CardHeader
                                    title={
                                        <Typography variant="h5">
                                            Price: {property.price}
                                        </Typography>
                                    }
                                    action={
                                        <div style={{ marginTop: "25%" }}>
                                            <IconButton onClick={handleShareClick}><ShareIcon /></IconButton>
                                            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                                        </div>
                                    }
                                    subheader={
                                        < Typography variant="body2" style={{ color: "gray" }}>
                                            For {property.propertyType}
                                        </Typography >
                                    }

                                />

                                < CardMedia component="img" image={`.${property.imageUrls}`} style={{ aspectRatio: "16/9" }} ></CardMedia>
                                < CardContent >
                                    <Typography variant="body1" style={{ height: "32px" }}>
                                        Address: {property.address}
                                    </Typography>
                                </CardContent >
                                <CardActions>
                                    <Button component={Link} to={`/explore/${property.propertyId}`}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    >
                                        VIEW DETAILS
                                    </Button>

                                </CardActions>

                            </Card >
                        </Grid >
                    )
                }
                )
                }
            </Grid>

        )
    }

    displayProperties = () => {
        return (
            <div>
                <Grid container spacing={3}>
                    {this.state.PropertyArray.map((cards, index) => {
                        return (
                            <Grid item md={4} key={index}>
                                <Card>
                                    <CardActionArea>
                                        <div >
                                            <CardHeader
                                                title={
                                                    <Typography variant="h5">
                                                        Price: {cards.price}
                                                    </Typography>
                                                }
                                                action={
                                                    <div >
                                                        <IconButton onClick={handleShareClick}><ShareIcon /></IconButton>
                                                        <IconButton onClick={() => this.wishlist(cards, index)}>
                                                            {this.state.arr[index] ?
                                                                <span className="heart" onClick={() => {
                                                                    const newarr1 = this.state.arr.map((data, i) => {
                                                                        if (i === index) {
                                                                            return !data
                                                                        } else {
                                                                            return data
                                                                        }
                                                                    })
                                                                    this.setState({
                                                                        arr: newarr1
                                                                    })

                                                                    const removewish = this.wishlistItems.length > 0 && this.wishlistItems.filter((ele, index1) => {
                                                                        if (index != index1) {
                                                                            return ele
                                                                        }
                                                                    })

                                                                    localStorage.setItem('wishlist', JSON.stringify(removewish))
                                                                    console.log(removewish);
                                                                }}>❤️</span> :
                                                                <span className="heart" onClick={() => {
                                                                    const newarr2 = this.state.arr.map((data, i) => {
                                                                        if (i === index) {
                                                                            return !data
                                                                        } else {
                                                                            return data
                                                                        }
                                                                    })
                                                                    this.setState({
                                                                        arr: newarr2
                                                                    })

                                                                    console.log('this one: ' + JSON.stringify(cards));
                                                                    this.wishlistItems.push(cards)
                                                                    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems))
                                                                }}>🤍</span>}
                                                        </IconButton>
                                                    </div>
                                                }
                                                subheader={
                                                    < Typography variant="body2" style={{ color: "gray" }}>
                                                        For {cards.propertyType}
                                                    </Typography >
                                                }
                                            />
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
    }

    render() {
        this.searchproperty()
        console.log(this.searchPro)
        if (this.searchPro.length === 0) {
            return (
                <div className="container">
                    <Typography style={{ color: "Black", textAlign: "center", fontWeight: "bold", margin: "10px" }} variant="h4">Explore Property page</Typography>
                    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                        {this.state.PropertyArray ? this.displayProperties() : ""}
                    </div>
                </div>
            )
        } else if (this.searchPro.length > 0) {
            return (
                <div >

                    <Typography style={{ color: "Black", textAlign: "center", fontWeight: "bold", margin: "10px" }} variant="h4">Explore Property page</Typography>
                    <Grid>
                        {this.searchPro ? this.displaysearched() : ""}
                    </Grid>
                </div>
            )
        }
    }
}
