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
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FBeer.png?alt=media&token=72c1a8c6-308c-4919-986e-92ddc4585e31",
                            action: {
                                type: "message",
                                label: "เบียร์",
                                text: "เบียร์"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FBooze.png?alt=media&token=c5c5aa8e-6901-4c49-af26-026cca4d90fb",
                            action: {
                                type: "message",
                                label: "สุราสี",
                                text: "สุราสี"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FWhiteBooze.png?alt=media&token=b4deec42-9c56-4770-b5c4-1f241c2b4561",
                            action: {
                                type: "message",
                                label: "สุราขาว",
                                text: "สุราขาว"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FLocalBooze.png?alt=media&token=f77c0ce8-2e4b-40ff-b2bc-4f93f22de175",
                            action: {
                                type: "message",
                                label: "สุราพื้นเมือง",
                                text: "สุราพื้นเมือง"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FWine.png?alt=media&token=4d50efa0-5ad3-45a5-aca8-01a47294461f",
                            action: {
                                type: "message",
                                label: "ไวน์",
                                text: "ไวน์"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FWineCooler.png?alt=media&token=29a1d0d1-dbb4-4f7c-b136-c4464b7b8f20",
                            action: {
                                type: "message",
                                label: "ไวน์คูลเลอร์",
                                text: "ไวน์คูลเลอร์"
                            }
                        },{
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Type%2FOther.png?alt=media&token=662b6bd1-c5aa-4c3f-aee0-da67a3c97269",
                            action: {
                                type: "message",
                                label: "เครื่องดื่มอื่นๆ",
                                text: "เครื่องดื่มอื่นๆ"
                            }
                        }
                    ]
                }
            }
        },
        containerSize: {
            all: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะดื่ม",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%2050mL.png?alt=media&token=2ddf61a2-669c-49d8-bd06-f05d21600600",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20165mL.png?alt=media&token=2f5876bf-d513-4831-8ba1-fbf0a78b015b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCan%20330mL.png?alt=media&token=7ee82ea5-a88c-4e53-ad06-54869db9aa76",
                            action: {
                                type: "message",
                                label: "กระป๋อง 330mL",
                                text: "กระป๋อง 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCan%20500mL.png?alt=media&token=7677b72d-37c1-40a6-bf11-cf37722a108b",
                            action: {
                                type: "message",
                                label: "กระป๋อง 500mL",
                                text: "กระป๋อง 500mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20330mL.png?alt=media&token=2d574fa0-4b0b-4d84-bdd6-53edfd017f46",
                            action: {
                                type: "message",
                                label: "ขวด 330mL",
                                text: "ขวด 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20350mL.png?alt=media&token=6b1a472b-c025-4f82-a2e3-96f4ecf6db5f",
                            action: {
                                type: "message",
                                label: "ขวด 350mL",
                                text: "ขวด 350mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20640mL.png?alt=media&token=bc9ccb5f-fe89-4d24-b324-fd837a655020",
                            action: {
                                type: "message",
                                label: "ขวด 640mL",
                                text: "ขวด 640mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20700mL.png?alt=media&token=efcbb692-8a27-49f0-a576-e0b577766f24",
                            action: {
                                type: "message",
                                label: "ขวด 700mL",
                                text: "ขวด 700mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FJar%201L.png?alt=media&token=96235666-d72e-40f8-a8b9-827cde04b68d",
                            action: {
                                type: "message",
                                label: "เหยือก 1000mL",
                                text: "เหยือก 1000mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%201L.png?alt=media&token=d3325d6c-f3b1-4e1d-8cfb-7739aa067f9e",
                            action: {
                                type: "message",
                                label: "ขวด 1000mL",
                                text: "ขวด 1000mL"
                            }
                        },
                    ]
                }
            },
            ไวน์คูลเลอร์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%2050mL.png?alt=media&token=2ddf61a2-669c-49d8-bd06-f05d21600600",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20100mL.png?alt=media&token=570371ff-9650-4b5e-b823-0f450048ab80",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass2%20165mL.png?alt=media&token=57418b9b-25f9-4f4c-8f61-077f8ff7eb3b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20165mL.png?alt=media&token=2f5876bf-d513-4831-8ba1-fbf0a78b015b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCan%20250mL.png?alt=media&token=6622d4ef-314b-4c04-930b-15978b50a3d8",
                            action: {
                                type: "message",
                                label: "กระป๋อง 250mL",
                                text: "กระป๋อง 250mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCan%20330mL.png?alt=media&token=7ee82ea5-a88c-4e53-ad06-54869db9aa76",
                            action: {
                                type: "message",
                                label: "กระป๋อง 330mL",
                                text: "กระป๋อง 330mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20275mL.png?alt=media&token=eb0f4b94-c350-4135-b4c0-730b0453a529",
                            action: {
                                type: "message",
                                label: "ขวด 275mL",
                                text: "ขวด 275mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FBottle%20330mL.png?alt=media&token=2d574fa0-4b0b-4d84-bdd6-53edfd017f46",
                            action: {
                                type: "message",
                                label: "ขวด 330mL",
                                text: "ขวด 330mL"
                            }
                        },
                    ]
                }
            },
            เบียร์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%2050mL.png?alt=media&token=2ddf61a2-669c-49d8-bd06-f05d21600600",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20100mL.png?alt=media&token=570371ff-9650-4b5e-b823-0f450048ab80",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass2%20165mL.png?alt=media&token=57418b9b-25f9-4f4c-8f61-077f8ff7eb3b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20165mL.png?alt=media&token=2f5876bf-d513-4831-8ba1-fbf0a78b015b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        }
                    ]
                }
            },
            ไวน์: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%2050mL.png?alt=media&token=2ddf61a2-669c-49d8-bd06-f05d21600600",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20100mL.png?alt=media&token=570371ff-9650-4b5e-b823-0f450048ab80",
                            action: {
                                type: "message",
                                label: "แก้ว 100mL",
                                text: "แก้ว 100mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass2%20165mL.png?alt=media&token=57418b9b-25f9-4f4c-8f61-077f8ff7eb3b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%20165mL.png?alt=media&token=2f5876bf-d513-4831-8ba1-fbf0a78b015b",
                            action: {
                                type: "message",
                                label: "แก้ว 165mL",
                                text: "แก้ว 165mL"
                            }
                        }
                    ]
                }
            },
            สุราพื้นเมือง: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCap%2015mL.png?alt=media&token=c7f6ee23-ca9d-4a85-be59-787c5cbfc2b6",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FGlass%2050mL.png?alt=media&token=2ddf61a2-669c-49d8-bd06-f05d21600600",
                            action: {
                                type: "message",
                                label: "แก้ว 50mL",
                                text: "แก้ว 50mL"
                            }
                        },
                    ]
                }
            },
            สุราสี: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCap%2015mL.png?alt=media&token=c7f6ee23-ca9d-4a85-be59-787c5cbfc2b6",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                    ]
                }
            },
            สุราขาว: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCap%2015mL.png?alt=media&token=c7f6ee23-ca9d-4a85-be59-787c5cbfc2b6",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                    ]
                }
            },
            เครื่องดื่มอื่นๆ: {
                type: "template",
                altText: "เลือกภาชนะที่คุณมักจะใช้ดื่มไวน์คูลเลอร์ค่ะ",
                template: {
                    type: "image_carousel",
                    columns: [
                        {
                            imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Container%2FCap%2015mL.png?alt=media&token=c7f6ee23-ca9d-4a85-be59-787c5cbfc2b6",
                            action: {
                                type: "message",
                                label: "ฝา 15mL",
                                text: "ฝา 15mL"
                            }
                        },
                    ]
                }
            },
        }
    })
}

export const motivation = () => {
    return ({
        type: "template",
        altText: "This is an image carousel template",
        template: {
          type: "image_carousel",
          columns: [
            {
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Motivation%2F1.png?alt=media&token=75d2b96e-5c0e-4811-9388-e33bfc711340",
              action: {
                type: "message",
                label: "ไม่มีปัญหา",
                text: "ฉันคิดว่าการดื่มของฉันไม่มีปัญหาอะไร"
              }
            },
            {
              imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Motivation%2F2.png?alt=media&token=fe2d9ab3-80f1-4590-b1b2-24cf072b3f3f",
              action: {
                type: "message",
                label: "คิดดื่มน้อยลง",
                text: "ฉันคิดเกี่ยวกับการดื่มให้น้อยลงบ้าง"
              }
            },
            {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Motivation%2F3.png?alt=media&token=0981c687-7ccd-4067-87ff-37cbe391506d",
                action: {
                    type: "message",
                    label: "อยากดื่มน้อยลง",
                    text: "ฉันต้องสินใจว่าจะต้องดื่มให้น้อยลง"
                  }
              },
              {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Motivation%2F4.png?alt=media&token=000526d6-f44d-40b9-be83-7d587f4341f8",
                action: {
                    type: "message",
                    label: "พร้อมดื่มน้อยลง",
                    text: "ฉันพร้อมแล้วที่จะเริ่มดื่มให้น้อยลง"
                  }
              },
              {
                imageUrl: "https://firebasestorage.googleapis.com/v0/b/assistant-drinker.appspot.com/o/Motivation%2F5.png?alt=media&token=36d41607-51ce-4a66-8d9b-d5abdcf809d1",
                action: {
                    type: "message",
                    label: "ฉันดื่มน้อยลง",
                    text: "ตอนนี้ฉันดื่มน้อยลงกว่าเมื่อก่อนแล้ว"
                  }
              },
          ]
        }
      })
}