import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMagnifyingGlass,
  faSignOutAlt,
  faUser,
  faXmark,
  faGift,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/img/logo1.png";
import { useDispatch, useSelector } from "react-redux";
import { LogOutUser } from "@/lib/features/user/userSlice";
import Cookies from "js-cookie";
import { HandlerContext } from "@/lib/providers/HandlerProvider";

import AddToCartPart from "./addToCartPart";

const HeaderContent = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [navBarOpen, setNavBarOpen] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState(""); // Manage search query
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered results
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [isHovered, setIsHovered] = useState(false); // Track hover state of the search input
  const [categories, setCategories] = useState([]); // Categories for the dropdown menu

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (!token) {
      dispatch(LogOutUser());
    }
    setAccessToken(token);

    // Fetch all products from API
    axios
      .get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/Product/search`)
      .then((response) => setAllProducts(response.data))
      .catch((err) => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const results = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    } else {
      setFilteredProducts([]); // Reset if no query is entered
    }
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_ENDPOINT}/Category/search`
        );
        setCategories(res.data.slice(0, 8)); // Limit to 8 categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query as user types
  };

  const handleMouseEnter = () => {
    setIsHovered(true); // Set hover state to true
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // Set hover state to false
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    setAccessToken(null);
    dispatch(LogOutUser());
  };

  return (
    <section className="relative">
      <div
        className={`lg:hidden ${
          navBarOpen ? "translate-x-0" : "-translate-x-full"
        } duration-300 absolute top-full`}
      >
        {/* Mobile menu dropdown */}
        <ul className="bg-white w-full">
          {categories.map((category, index) => (
            <li key={index} className="border-b">
              <Link
                href={`/Category/${category.Id}`}
                className="block px-4 py-3 text-gray-800 hover:bg-gray-200"
                onClick={() => setNavBarOpen(false)} // Close menu on category click
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-primary text-white w-full h-[57px] md:h-20 grid place-items-center px-3">
        <nav className="container flex items-center justify-between h-full gap-8 lg:gap-14">
          <div className="flex items-center justify-between gap-6 grow">
            <button
              onClick={() => setNavBarOpen(!navBarOpen)}
              className="flex flex-col items-center justify-center w-16 text-3xl h-7 md:text-4xl lg:hidden"
            >
              {navBarOpen ? (
                <FontAwesomeIcon icon={faXmark} />
              ) : (
                <FontAwesomeIcon icon={faBars} />
              )}
            </button>

            <Link href="/" className="w-[100px] md:w-[125px] relative h-full">
              <Image src={Logo} alt="Logo" width={250} height={250} priority />
            </Link>

            <div
              className="relative hidden grow lg:block"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <form
                action="#"
                method="post"
                className="flex items-center h-8 overflow-hidden text-black bg-white rounded md:h-10"
              >
                <label className="sr-only">Search</label>
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search for products"
                  className="h-full px-4 border-none outline-none grow focus:ring-transparent"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button
                  type="submit"
                  className="h-full px-3 text-2xl outline-none text-primary"
                >
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-4 text-black"
                  />
                </button>
              </form>

              {/* Display filtered results only when hovered and query exists */}
              {isHovered &&
                searchQuery.length > 0 &&
                filteredProducts.length > 0 && (
                  <div className="absolute z-40 top-full left-0 w-full bg-white text-black shadow-lg max-h-72 overflow-y-auto">
                    <ul>
                      {filteredProducts.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/product-info/${product.Id}`}
                            className="block p-2 hover:bg-gray-200"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 w-full py-3 bg-black lg:relative lg:w-fit lg:py-0 lg:bg-transparent">
            <ul className="flex items-center justify-around gap-4 list-none md:gap-6 lg:gap-8">
              <li>
                <Link
                  href="/offer"
                  className="flex flex-col items-center gap-2 lg:flex-row"
                >
                  <div>
                    <FontAwesomeIcon icon={faGift} className="w-5 h-5" />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-2xs md:text-sm">Offers</p>
                    <p className="text-xs mt-[-1px] hidden lg:block">
                      Latest Offers
                    </p>
                  </div>
                </Link>
              </li>
              <li>
                <AddToCartPart />
              </li>
              {currentUser ? (
                <li className="flex flex-col items-center gap-2 lg:flex-row">
                  <div>
                    <Link
                      href={
                        currentUser.role === "admin"
                          ? "/dashboard"
                          : `/User/${currentUser.Id}`
                      }
                    >
                      <Image
                        src="/img/user.png"
                        alt="Profile"
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    </Link>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 lg:flex-row text-white"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5" />

                    <span className="text-xs md:text-sm">Logout</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    href="/signin"
                    className="flex flex-col items-center gap-2 lg:flex-row"
                  >
                    <div>
                      <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                    </div>
                    <div className="text-white">
                      <p className="font-semibold text-2xs md:text-sm">
                        Account
                      </p>
                      <p className="text-xs mt-[-1px] hidden lg:block">
                        Register or Login
                      </p>
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default HeaderContent;
