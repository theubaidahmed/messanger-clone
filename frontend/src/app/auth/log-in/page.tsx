'use client';

import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Link,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import React from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import Form from '@/components/Form';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import GoogleButton from '@/components/GoogleButton';
import FacebookButton from '@/components/FacebookButton';
import { isEmpty } from '@/utils/function';
import axios from 'axios';
import useErrorHandler from '@/hooks/useErrorHandler';
import Input from '@/components/Input';

const AuthForm = () => {
    const router = useRouter();
    const errorHandler = useErrorHandler();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            const response = await axios.post('/auth/login', data);
            setCookie('accessToken', response.data.token, {
                domain: process.env.DOMAIN,
            });
            router.push('/c');
        } catch (err) {
            errorHandler(err);
        }
    };

    return (
        <Box
            sx={{
                width: { xs: 'auto', xm: '400px' },
                py: 5,
                transition: '.2s',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Typography
                sx={{
                    backgroundImage:
                        'linear-gradient(83.84deg, rgb(0, 136, 255) -6.87%, rgb(160, 51, 255) 26.54%, rgb(255, 92, 135) 58.58%)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    fontSize: '80px',
                    fontWeight: 500,
                    lineHeight: '75px',
                    fontFamily:
                        'Calibre, Helvetica Neue, Segoe UI, Helvetica, Arial, Lucida Grande, sans-serif',
                }}>
                Hang out <br />
                whenever, <br /> wherever
            </Typography>
            <Typography variant='body1' mb={isEmpty(errors) ? 5 : 1} color='text.secondary'>
                Messenger makes it easy and fun to stay close to your favourite people.
            </Typography>

            {isEmpty(errors) ? null : (
                <Typography variant='body2' color='red' mb={1.5}>
                    {Object.values(errors)[0]?.message as string}
                </Typography>
            )}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    fieldName='email'
                    variation='auth'
                    placeholder='Email address'
                    register={register}
                    registerOptions={{
                        required: 'Email address is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Email address must be valid',
                        },
                    }}
                />

                <Input
                    variation='auth'
                    type='password'
                    placeholder='Password'
                    fieldName='password'
                    register={register}
                    registerOptions={{ required: 'Password is required' }}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={isSubmitting}
                    endIcon={
                        isSubmitting && (
                            <CircularProgress sx={{ color: 'contrastColor' }} size='small' />
                        )
                    }
                    sx={{ my: 2, py: 1, borderRadius: '10px' }}>
                    Log In
                </Button>
            </Form>

            <Divider variant='middle' sx={{ borderWidth: '2px' }}>
                <Typography variant='body2' color='text.secondary'>
                    Or continue with
                </Typography>
            </Divider>

            <Stack mt={3} spacing={2} my={3.5}>
                <GoogleButton
                    name='Continue with Google'
                    href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`}
                />
                <FacebookButton name='Continue with Facebook' />
            </Stack>

            <Stack direction='row' justifyContent='center' spacing={2}>
                <div>New to Messenger?</div>
                <Link href='/auth/create' color='primary.main' fontWeight={500}>
                    Create an account
                </Link>
            </Stack>
        </Box>
    );
};

export default AuthForm;
