import React, { Fragment, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { newService, clearErrors } from "../../actions/serviceActions";
import { NEW_SERVICE_RESET } from "../../constants/serviceConstants";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
// import Toast from "../layout/Toast";
import { Button, FormGroup, Grid, Paper, Stack, TextField, Typography } from "@mui/material";

const NewService = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm(
        {
            mode: "onChange",
            defaultValues:
            {
                name: name,
                price: price,
                description: description
            }
        }
    );
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newService);

    const message = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        if (error) {
            toast("Error", "Error");
            dispatch(clearErrors());
        }

        if (success) {
            toast("New Service!", "Success");
            navigate("/services");

            message("Service created successfully");

            dispatch({ type: NEW_SERVICE_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = (data) => {
        // e.preventDefault();

        const formData = new FormData();

        formData.set("name", data.name);

        formData.set("price", data.price);

        formData.set("description", data.description);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(newService(formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);

        setImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [...oldArray, reader.result]);

                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        setImagesPreview(URL.createObjectURL(file));
        imagesPreview(file);
    };

    //Paper CSS/Style
    const paperStyle = {
        padding: 40,
        height: '80vh',
        width: 1000,
        margin: "100px auto",
        backgroundColor: "#f5f5f5"
    }

    const errorStyle = {
        color: "red"
    }

    const gridStyle = {
        paddingRight: 50,
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <MetaData title={"New Services"} />
                    <Grid style={gridStyle}>
                        <Paper elevation={10} style={paperStyle}>
                            <Typography variant='h3' align='center' padding='10px'>New Services</Typography>
                            <form
                                onSubmit={handleSubmit(submitHandler)}
                                encType="multipart/form-data"
                            >
                                <FormGroup>
                                    <Stack spacing={2} alignItems='center'>

                                        <TextField label='Name' variant='standard' id='name_field'
                                            type='name'
                                            onChange={(e) => setName(e.target.value)} fullWidth
                                            {...register("name", {
                                                required: "Name is required."
                                            })}
                                        />
                                        {errors.name && <Typography style={errorStyle} variant="body1">{errors.name.message}</Typography>}

                                        <TextField
                                            id="description_field"
                                            label="Description"
                                            multiline
                                            rows={4}
                                            fullWidth
                                            onChange={(e) => setDescription(e.target.value)}
                                            {...register("description", {
                                                required: "Description is required."
                                            })}
                                        />
                                        {errors.description && <Typography style={errorStyle} variant="body1">{errors.description.message}</Typography>}

                                        <TextField label='Price' variant='standard' id='price_field'
                                            type='number'
                                            onChange={(e) => setPrice(e.target.value)} fullWidth
                                            {...register("price", {
                                                required: "Price is required."
                                            })} />
                                        {errors.price && <Typography style={errorStyle} variant="body1">{errors.price.message}</Typography>}

                                        <div className="custom-file">
                                            <input
                                                type="file"
                                                name="avatar"
                                                className="custom-file-input"
                                                id="customFile"
                                                accept="images/*"
                                                onChange={onChange}
                                                multiple
                                            />
                                            <label className="custom-file-label" htmlFor="customFile">
                                                Choose Avatar
                                            </label>
                                        </div>
                                        <Button id="register_button" type="submit" size="large" variant="contained" color="primary" fullWidth>Create Service</Button>
                                    </Stack>
                                </FormGroup>
                            </form>
                        </Paper>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
};

export default NewService;