export const alcohol = () => {
    return ({
        types: {
            all: {
                type: "template",
                altText: "เลือกชนิดเครื่องดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/AlcoholType%2Fwine.png?alt=media&token=09980ffa-312a-4cf7-8266-08671957fff1",
                            action: {
                                type: "message",
                                label: "ไวน์",
                                text: "ไวน์"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/AlcoholType%2Fspirits.png?alt=media&token=877e1604-c2f0-4c95-a992-90995e159977",
                            action: {
                                type: "message",
                                label: "สุรา",
                                text: "สุรา"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/AlcoholType%2Fcider.png?alt=media&token=e3909083-e14c-4eab-b489-94e076bbb1de",
                            action: {
                                type: "message",
                                label: "ไซเดอร์",
                                text: "ไซเดอร์"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/AlcoholType%2Fbeer.png?alt=media&token=27474a00-b858-4cc0-97df-23c3c5fa4980",
                            action: {
                                type: "message",
                                label: "เบียร์",
                                text: "เบียร์"
                            }
                        },
                    ]
                }
            },
            ไวน์: {
                type: "template",
                altText: "เลือกปริมาณแอลกอฮอล์ของไวน์ที่คุณดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/wineType%2Fwine%2012%25.png?alt=media&token=87c068df-d209-4a2f-a49b-53436ac34742",
                            action: {
                                type: "message",
                                label: "ไวน์ 12%",
                                text: "ไวน์ 12%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/wineType%2Fwine%2012.5%25.png?alt=media&token=cf1f48bf-0576-475f-9283-6c9c848b9c89",
                            action: {
                                type: "message",
                                label: "ไวน์ 12.5%",
                                text: "ไวน์ 12.5%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/wineType%2Fwine%2013%25.png?alt=media&token=c5f2f67d-ae4e-4d7c-a2e7-e3bdad176744",
                            action: {
                                type: "message",
                                label: "ไวน์ 13%",
                                text: "ไวน์ 13%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/wineType%2Fwine%2014%25%20.png?alt=media&token=b94db090-b2db-434c-bc4b-085352fb7edf",
                            action: {
                                type: "message",
                                label: "ไวน์ 14%",
                                text: "ไวน์ 14%"
                            }
                        },
                    ]
                }
            },
            เบียร์: {
                type: "template",
                altText: "เลือกปริมาณแอลกอฮอล์ของเบียร์ที่คุณดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/beerType%2Fbeer%202.5%25.png?alt=media&token=bcf7b884-1d7f-4298-aad5-259cbe7940f4",
                            action: {
                                type: "message",
                                label: "เบียร์ 2.5%",
                                text: "เบียร์ 2.5%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/beerType%2Fbeer%204%25.png?alt=media&token=06317dd1-deac-4ecb-974b-17c79b7a003a",
                            action: {
                                type: "message",
                                label: "เบียร์ 4%",
                                text: "เบียร์ 4%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/beerType%2Fbeer%204.2%25.png?alt=media&token=d4d09c59-59a6-481e-9370-28cf9601b12c",
                            action: {
                                type: "message",
                                label: "เบียร์ 4.2%",
                                text: "เบียร์ 4.2%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/beerType%2Fbeer%205%25.png?alt=media&token=75e04cc9-30aa-410c-9662-a7570468ee74",
                            action: {
                                type: "message",
                                label: "เบียร์ 5%",
                                text: "เบียร์ 5%"
                            }
                        },
                    ]
                }
            },
            ไซเดอร์: {
                type: "template",
                altText: "เลือกปริมาณแอลกอฮอล์ของไซเดอร์ที่คุณดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ciderType%2Fcider%205%25.png?alt=media&token=40999ce8-217d-4742-92a5-6d8f1742501f",
                            action: {
                                type: "message",
                                label: "ไซเดอร์ 5%",
                                text: "ไซเดอร์ 5%"
                            }
                        },
                    ]
                }
            },
            สุรา: {
                type: "template",
                altText: "เลือกปริมาณแอลกอฮอล์ของสุราที่คุณดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2Fspirits%206%25.png?alt=media&token=1f7ea068-c65e-4a39-9cde-05d89366e447",
                            action: {
                                type: "message",
                                label: "สุรา 6%",
                                text: "สุรา 6%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2Fspirits%2037%25.png?alt=media&token=c8c68777-0833-4c86-b45b-5485c6ed04fc",
                            action: {
                                type: "message",
                                label: "สุรา 37%",
                                text: "สุรา 37%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2FspiritsB%2037.5%25.png?alt=media&token=57a25ee1-163a-4d2d-9fa6-06881f33adb2",
                            action: {
                                type: "message",
                                label: "สุรา 37.5%",
                                text: "สุรา 37.5%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2Fspirits%2040%25.png?alt=media&token=5c4dd7a3-9b4e-444f-adad-03f59b2d9d8a",
                            action: {
                                type: "message",
                                label: "สุรา 40%",
                                text: "สุรา 40%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2Fspirits%2045%25%20.png?alt=media&token=aef14665-3ba9-4203-afec-b2f8d8cb7a2c",
                            action: {
                                type: "message",
                                label: "สุรา 45%",
                                text: "สุรา 45%"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/spiritsType%2Fspirits%2047%25.png?alt=media&token=453b4089-5cdb-487f-b41f-895935c24862",
                            action: {
                                type: "message",
                                label: "สุรา 47%",
                                text: "สุรา 47%"
                            }
                        },
                    ]
                }
            }
        },
        containerSize: {
            type: "template",
            altText: "เลือกภาชนะที่คุณมักจะดื่ม",
            template: {
                type: "image_carousel",
                columns: [
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fglass%20100ml.png?alt=media&token=87c4da3e-ab2e-4a9f-8389-aae0ca93d9cd",
                        action: {
                            type: "message",
                            label: "แก้ว 100ml",
                            text: "แก้ว 100ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fcan%20330ml.png?alt=media&token=2dd1edb6-a6f5-4baa-a7b1-bcd3ae58c7d7",
                        action: {
                            type: "message",
                            label: "กระป๋อง 330ml",
                            text: "กระป๋อง 330ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fcan%20440ml%20.png?alt=media&token=faa9cf44-52f6-4824-a068-c26fc396fb2e",
                        action: {
                            type: "message",
                            label: "กระป๋อง 440ml",
                            text: "กระป๋อง 440ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%2050ml.png?alt=media&token=2347ce79-8873-4e82-97e7-7e72cffd1ca2",
                        action: {
                            type: "message",
                            label: "ขวด 50ml",
                            text: "ขวด 50ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%20275ml.png?alt=media&token=0157040e-43ad-4b19-9f14-8430910ea020",
                        action: {
                            type: "message",
                            label: "ขวด 275ml",
                            text: "ขวด 275ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%20330ml.png?alt=media&token=ceb3d0a3-fc36-4861-a143-4d82f0c61725",
                        action: {
                            type: "message",
                            label: "ขวด 330ml",
                            text: "ขวด 330ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%20335ml.png?alt=media&token=67d8e554-1a79-40a4-8783-391c292c237e",
                        action: {
                            type: "message",
                            label: "ขวด 335ml",
                            text: "ขวด 335ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%20700ml.png?alt=media&token=b2efe77e-8bd9-4d05-8c63-a14c77494e32",
                        action: {
                            type: "message",
                            label: "ขวด 700ml",
                            text: "ขวด 700ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%20750ml.png?alt=media&token=6da225dc-3ccb-4791-bf4d-0c552d8a30ae",
                        action: {
                            type: "message",
                            label: "ขวด 750ml",
                            text: "ขวด 750ml"
                        }
                    },
                    {
                        imageUrl: "https://firebasestorage.googleapis.com/v0/b/doctor-natt-por-took-satabun.appspot.com/o/ContainerSize%2Fbottle%201000ml.png?alt=media&token=ed5ec703-d304-4f78-8a75-c130306a167a",
                        action: {
                            type: "message",
                            label: "ขวด 1000ml",
                            text: "ขวด 1000ml"
                        }
                    },
                ]
            }
        }
    })
}