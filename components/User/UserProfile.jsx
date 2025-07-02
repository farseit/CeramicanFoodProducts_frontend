"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { IoMail } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { RiImageAddFill } from "react-icons/ri";
import imageCompression from "browser-image-compression";
import {
  Modal,
  Backdrop,
  Fade,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import {
  RiHomeSmile2Fill,
  RiMenu3Fill,
  RiLogoutCircleLine,
} from "react-icons/ri";
import { FaArrowLeft } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { MdPlace } from "react-icons/md";
import useScreenResize from "@/hooks/screenSize";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import axios from "axios";
import {
  UpdateProfileFailure,
  UpdateProfileStart,
  UpdateProfileSuccess,
} from "@/lib/features/user/userSlice";
import Link from "next/link";

const UserProfile = ({ params }) => {
  const { Id } = params;
  const screenSize = useScreenResize();
  const { currentUser } = useSelector((state) => state.user);
  console.log("user", currentUser);
  const theme = useTheme();
  const [open, setOpen] = React.useState(screenSize >= 1280); // Drawer for large screens
  const [mobileDrawer, setMobileDrawer] = React.useState(false); // Drawer for small screens
  const [profileImage, setProfileImage] = React.useState(currentUser.Image);
  const [editState, setEditState] = React.useState(false);
  const dispatch = useDispatch();

  // Update the drawer state based on screen size
  React.useEffect(() => {
    if (screenSize >= 1280) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [screenSize]);

  const [openModal, setOpenModal] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulating an API call to fetch orders
    const fetchedOrders = [
      { id: 1, customer: "John Doe", total: 150, status: "Processing" },
      { id: 2, customer: "Jane Smith", total: 200, status: "Shipped" },
      { id: 3, customer: "Mark Johnson", total: 120, status: "Delivered" },
    ];
    setOrders(fetchedOrders);
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const toggleDrawer = (newOpen) => {
    setMobileDrawer(newOpen);
  };

  const drawerWidth = screenSize >= 600 ? 240 : 150;

  const handleImageUpload = async (event) => {
    dispatch(UpdateProfileStart());
    const file = event.target.files[0];

    if (file) {
      // Compress the image before uploading
      const options = {
        maxSizeMB: 0.1, // Target around 100KB
        maxWidthOrHeight: 1024, // Max width/height of the output image
        useWebWorker: true, // Speed up compression
      };

      try {
        // Compress the image
        const compressedFile = await imageCompression(file, options);

        // Rename the compressed file to match the original
        const renamedFile = new File([compressedFile], file.name, {
          type: file.type,
        });

        // Update the preview image in the frontend
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileImage(e.target.result);
        };
        reader.readAsDataURL(renamedFile);

        // Prepare FormData for the backend
        const formData = new FormData();
        formData.append("ProfilePicture", renamedFile); // 'ProfilePicture' must match the backend key

        // Send the compressed image to the backend
        const response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/ChangeProfilePicture/${Id}`,
          formData
        );
        if (response.status === 200) {
          dispatch(UpdateProfileSuccess(response.data));
          alert("Image added successfully!");
        }
      } catch (error) {
        console.error(error);
        dispatch(UpdateProfileFailure(error.message));
        alert("Error uploading image: " + error.message);
      }
    }
  };

  React.useEffect(() => {}, [profileImage]);

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(UpdateProfileStart());
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("address", e.target.address.value);
    formData.append("phone", e.target.phone.value);

    console.log("data", formData);

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/profile/edit/${Id}`,
        formData, // Sending FormData object
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.message);
        dispatch(UpdateProfileSuccess(response.data));
        alert("Profile Edit Success");
      }
    } catch (error) {
      alert(error);
      dispatch(UpdateProfileFailure());
    }
  };

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(10)} + 0.5px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  return (
    <Box sx={{ display: "flex", position: "relative" }}>
      <CssBaseline />
      {/* AppBar */}
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#273c75" }}>
        <Toolbar>
          {screenSize >= 1280 && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[{ marginRight: 5 }, open && { display: "none" }]}
            >
              <RiMenu3Fill size={30} />
            </IconButton>
          )}

          {screenSize < 1280 && (
            <IconButton color="inherit">
              {mobileDrawer ? (
                <ImCross size={30} onClick={() => toggleDrawer(false)} />
              ) : (
                <RiMenu3Fill size={30} onClick={() => toggleDrawer(true)} />
              )}
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            <div className="lg:ml-[2rem] ml-[1rem] lg:pl-[1rem] pl-2 flex items-center gap-3 border-l">
              <RiHomeSmile2Fill size={30} />

              {currentUser.role === "admin" ? (
                <Link href={"/dashboard"}>Dashboard</Link>
              ) : (
                <Link href={"/"}>Back To Store</Link>
              )}
            </div>
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for large screens */}
      {screenSize >= 1280 && (
        <Drawer
          variant="permanent"
          open={open}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <FaArrowLeft size={25} />
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* Drawer content */}
          <div
            className={`flex flex-col items-center justify-center ${
              open ? "h-[15rem]" : "h-[5rem]"
            }`}
          >
            <div className="max-h-[2.5rem] min-h-[2.5rem] max-w-[2.5rem] min-w-[2.5rem] flex items-center justify-center overflow-hidden rounded-full">
              <Image src={currentUser.Image} height={40} width={40} />
            </div>
            {open && (
              <p className="lg:text-xl font-semibold">{currentUser.name}</p>
            )}
            {open && (
              <p className="text-[rgba(0,0,0,0.5)] text-sm">
                Member Type: {currentUser.role}
              </p>
            )}
          </div>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{ justifyContent: "initial" }}
                onClick={handleOpenModal}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <BsCartCheckFill size={30} />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
              </ListItemButton>
              {/* <ListItemButton
                sx={{ justifyContent: open ? "initial" : "center" }}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <MdPlace size={open ? 30 : 25} />
                </ListItemIcon>
                <ListItemText
                  primary="Address"
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton> */}

              <ListItemButton
                sx={{ justifyContent: open ? "initial" : "center" }}
              >
                <ListItemIcon sx={{ justifyContent: "center" }}>
                  <RiLogoutCircleLine size={open ? 30 : 25} />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
            }}
          >
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Order Status
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Your latest order is <b>Processing</b>. Estimated delivery: 3
              days.
            </Typography>

            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">Order ID</th>
                  <th className="border p-2 text-left">Customer</th>
                  <th className="border p-2 text-left">Total</th>
                  <th className="border p-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border p-2">{order.id}</td>
                    <td className="border p-2">{order.customer}</td>
                    <td className="border p-2">${order.total}</td>
                    <td className="border p-2">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={handleCloseModal}
              style={{
                marginTop: "15px",
                padding: "10px 15px",
                backgroundColor: "#273c75",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </Box>
        </Fade>
      </Modal>

      {/* Drawer for mobile/tablet screens */}
      {screenSize < 1280 && (
        <MuiDrawer open={mobileDrawer} onClose={() => toggleDrawer(false)}>
          <Box sx={{ zIndex: 50 }}>
            <div className="flex flex-col items-center justify-center h-[15rem]">
              <div className="max-h-[4.5rem] min-h-[4.5rem] max-w-[4.5rem] min-w-[4.5rem] flex items-center justify-center overflow-hidden rounded-full">
                <Image src={currentUser.Image} height={90} width={90} />
              </div>
              <p className="lg:text-xl font-semibold">{currentUser.name}</p>
              <p className="text-[rgba(0,0,0,0.5)] text-sm">
                Member Type: General
              </p>
              <p className="text-sm">
                Points: <span className="text-[red] font-semibold">0</span>
              </p>
            </div>
            <Divider />
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <BsCartCheckFill size={25} />
                  </ListItemIcon>
                  <ListItemText primary="My Orders" />
                </ListItemButton>
                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <MdPlace size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Change Password" />
                </ListItemButton>

                <ListItemButton sx={{ justifyContent: "center" }}>
                  <ListItemIcon sx={{ justifyContent: "center" }}>
                    <RiLogoutCircleLine size={25} />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </MuiDrawer>
      )}

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {/* Profile Info Section */}
        <p className="text-xl ">Personal Info</p>

        <form
          className="w-full h-full flex lg:flex-row flex-col gap-8 items-center justify-center"
          onSubmit={handleSubmit}
        >
          {/* Profile Image Section */}
          <div className="lg:w-[30%] flex flex-col items-center gap-4">
            <div className="max-h-[10rem] lg:max-h-[12rem] min-h-[8rem] lg:min-h-[10rem] max-w-[10rem] lg:max-w-[12rem] min-w-[8rem] lg:min-w-[10rem] border-4 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
              <Image
                src={profileImage}
                height={170}
                width={170}
                className="object-cover"
                alt="User picture"
              />
            </div>

            {/* File Upload */}
            <input
              className="hidden"
              id="imageChange"
              type="file"
              onChange={handleImageUpload}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                document.getElementById("imageChange").click();
              }}
              className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
            >
              <RiImageAddFill size={20} />
            </button>
          </div>

          {/* Form Fields Section */}
          <div className="lg:w-[70%] w-full lg:px-10 px-4 flex flex-col gap-6">
            {/* Name Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="name"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={currentUser.name}
              />
            </div>

            {/* Email Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="email"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                defaultValue={currentUser.email}
                disabled
              />
            </div>

            {/* Address Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="address"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={currentUser.address}
              />
            </div>

            {/* Phone Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="phone"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                name="phone"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue={currentUser.phone}
              />
            </div>

            {/* Role Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="role"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Role
              </label>
              <input
                type="text"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                defaultValue={currentUser.role}
                disabled
              />
            </div>

            {/* Joined Field */}
            <div className="flex w-full gap-4">
              <label
                htmlFor="joined"
                className="w-[30%] text-lg font-medium text-gray-700"
              >
                Joined
              </label>
              <input
                type="text"
                className="w-[70%] py-2 px-4 rounded-lg border border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed"
                defaultValue={currentUser.registration_date}
                disabled
              />
            </div>

            {/* Update Button */}
            {editState && (
              <button
                className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </Box>

      {!editState && (
        <button
          className="absolute top-20 right-10 bg-[rgba(0,0,255,0.5)] px-2 py-1 rounded-xl text-white"
          onClick={() => setEditState(true)}
        >
          Edit Info
        </button>
      )}
    </Box>
  );
};

export default UserProfile;
