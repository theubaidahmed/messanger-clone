import { IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';
import React, { Dispatch, Fragment, SetStateAction } from 'react';

import { Key } from '../chat/Main';
// import SearchBar from '@/components/SearchBar';
import { IoClose } from 'react-icons/io5';

type LinksProps = {
    setComponent: Dispatch<SetStateAction<any>>;
};

const Links = (props: LinksProps) => {
    const { setComponent } = props;

    return (
        <Fragment>
            <Stack direction='row' spacing={0.5} alignItems='center' py={1.6} mx={0.5}>
                <IconButton onClick={() => setComponent('details')}>
                    <IoClose />
                </IconButton>

                <Typography variant='subtitle1' fontSize={17}>
                    Links
                </Typography>
            </Stack>

            {/* <Stack direction='row' px={1.5}>
                <SearchBar />
            </Stack> */}

            {true ? (
                <List sx={{ p: 1.5 }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText
                                primary='8/24/24'
                                secondary='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo, eius.'
                                primaryTypographyProps={{ fontSize: 12 }}
                                secondaryTypographyProps={{
                                    sx: {
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: '1',
                                    },
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            ) : (
                <Typography variant='subtitle1' color='text.secondary' my={5} textAlign='center'>
                    Search messages with
                </Typography>
            )}
        </Fragment>
    );
};

export default Links;
