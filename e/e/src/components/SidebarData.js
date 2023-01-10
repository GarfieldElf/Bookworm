import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


const SidebarData = 



    [

        {
            title: "Book Genres",
            path: "#",
            iconClosed: <ArrowDownwardIcon />,
            iconOpened: <ArrowUpwardIcon />,

            subNav: [

                {
                    title: "Sci-fi",
                    path: "/bookgenres/sci-fi/",



                },

                {
                    title: "History",
                    path: "/bookgenres/history/",



                },


                {
                    title: "Romance",
                    path: "/bookgenres/romance/",



                },

                {
                    title: "Drama",
                    path: "/bookgenres/drama/",



                },

                {
                    title: "Adventure",
                    path: "/bookgenres/adventure/",



                },

                {
                    title: "Crime",
                    path: "/bookgenres/crime/",



                },

                {
                    title: "Horror",
                    path: "/bookgenres/horror/",



                },

             





            ]







        },




    ]




export default SidebarData;