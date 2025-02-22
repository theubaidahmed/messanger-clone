'use client';

import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Divider,
    Grid,
    IconButton,
    ListItemText,
    Menu,
    MenuItem,
    Modal,
    Skeleton,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useRef, useState, MouseEvent } from 'react';
import Avatar from '@/components/lib/avatar';
// import Input from './Chat/Input';
// import Message from './Chat/Message';
import useMenu from '@/hooks/useMenu';
import { isEmpty } from '@/utils/function';
// import { useInfiniteQuery, useQueries, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
// import { useIntersection } from '@mantine/hooks';
import { DateTime } from 'luxon';
// import eventEmitter from '@/utils/eventEmitter';
import useErrorHandler from '@/hooks/useErrorHandler';
import useModal from '@/hooks/useModal';
import useLoader from '@/hooks/useLoader';
import lodash from 'lodash';
// import { useQueryClient } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { notFound, useRouter } from 'next/navigation';
import { setContactPanel } from '@/store/features/chat/chatSlice';

// Icons
import { IoMdMore, IoIosVideocam } from 'react-icons/io';
import { MdBlock } from 'react-icons/md';
import { FaPhone } from 'react-icons/fa6';
import { useChatDetails } from '@/api/chats/client';

const Header = () => {
    const { chat, contactPanel } = useAppSelector(state => state.chat);
    const dispatch = useAppDispatch();

    const { data } = useChatDetails('66dc13a98c89ee1ae0a94eb7');
    console.log({ data });

    const toggleContactPanel = () => dispatch(setContactPanel(!contactPanel));

    // if (contactId !== contact._id) return notFound();

    const { anchorEl: anchorElCall, openMenu: openCallMenu, closeMenu: closeCallMenu } = useMenu();

    const { modalState: blockState, openModal: openBlockModal, closeModal: closeBlockModal } = useModal();

    const { start: blockStart, end: blockEnd, circular: blockCircular } = useLoader();
    const router = useRouter();

    return chat ? (
        <React.Fragment>
            <Box
                sx={{
                    backdropFilter: 'blur(16px) saturate(180%)',
                    '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
                    backgroundColor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}>
                <Grid container px={1} py={1.6} gap={1.5} alignItems='center'>
                    <Stack direction='row' spacing={1.5} sx={{ cursor: 'pointer' }} onClick={toggleContactPanel}>
                        <Badge
                            badgeContent=' '
                            color='success'
                            variant='dot'
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            sx={{
                                '.MuiBadge-badge': {
                                    bottom: 7,
                                    right: 7,
                                },
                            }}>
                            <Avatar
                                alt='Remy Sharp'
                                src={chat.picture}
                                sx={{
                                    width: 45,
                                    height: 45,
                                }}
                            />
                        </Badge>

                        <Box>
                            <Typography
                                variant='subtitle1'
                                lineHeight={1.2}
                                fontWeight='500'
                                sx={{
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: '1',
                                }}>
                                {chat.name}
                            </Typography>
                            <Typography variant='body2' fontWeight={500} color='text.secondary'>
                                Active now
                            </Typography>
                        </Box>
                    </Stack>
                    <Grid item xs>
                        <Stack direction='row' justifyContent='flex-end' color='primary'>
                            {chat.blocked && <MdBlock style={{ fontSize: 18, marginRight: '4px' }} />}
                        </Stack>
                        <Stack direction='row' justifyContent='flex-end'>
                            <IconButton
                                onClick={openCallMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    mr: 0.5,
                                }}>
                                <FaPhone size={18} />
                            </IconButton>
                            <IconButton
                                onClick={openCallMenu}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                    mr: 0.5,
                                }}>
                                <IoIosVideocam />
                            </IconButton>
                            <IconButton
                                onClick={toggleContactPanel}
                                sx={{
                                    textAlign: 'center',
                                    color: 'primary.main',
                                    borderRadius: '500px',
                                }}>
                                <IoMdMore size={18} />
                            </IconButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Menu
                anchorEl={anchorElCall}
                open={Boolean(anchorElCall)}
                onClose={closeCallMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{ marginTop: '20px' }}>
                <Typography variant='subtitle2' fontWeight={500} color='text.secondary'>
                    This feature will be available soon
                </Typography>
            </Menu>

            <Modal open={blockState} onClose={closeBlockModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        width: 'min(100%, 510px)',
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px',
                        border: '1px solid',
                        borderColor: 'white',
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        borderRadius: '8px',
                        p: 2,
                    }}>
                    <Typography variant='subtitle1'>
                        {chat.blocked ? 'Unblock' : 'Block'} {chat.name} ?
                    </Typography>
                    {!chat.blocked && (
                        <>
                            <Divider variant='fullWidth' sx={{ my: 1 }} />
                            <Typography variant='body2' mb={2}>
                                Blocked customers will no longer be able to call you or send you messages.
                            </Typography>
                        </>
                    )}

                    <Box mt={3} sx={{ float: 'right' }}>
                        <Button variant='text' sx={{ mr: 1.5 }} onClick={closeBlockModal}>
                            Cancel
                        </Button>
                        <Button
                            variant='contained'
                            //  onClick={blockCustomer}
                            endIcon={blockCircular}>
                            {' '}
                            {chat.blocked ? 'Unblock' : 'Block'}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    ) : null;
};

export default Header;
