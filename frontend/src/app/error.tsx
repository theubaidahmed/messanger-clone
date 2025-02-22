'use client';

import React, { FC } from 'react';
import Image from '@/components/lib/image';
import { Button, Container, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

type ErrorProps = {
    error: any;
    reset: () => void;
};

const Error: FC<ErrorProps> = ({ error, reset }) => {
    const router = useRouter();

    return (
        <Container maxWidth='lg'>
            <Stack justifyContent='center' alignItems='center' minHeight='calc(100vh - 80px)' textAlign='center' my={5}>
                <Image name='logo.png' sx={{ height: '65px', mb: 2 }} alt='logo' />{' '}
                <Typography variant='h4' mb={1}>
                    Some error occurred
                </Typography>
                <Typography variant='subtitle1'>{error.message}</Typography>
                <Stack direction='row' spacing={2} my={2}>
                    <Button variant='contained' onClick={reset} sx={{ mt: 1.5, mb: 2, py: 1, borderRadius: '10px' }}>
                        Try again
                    </Button>
                    <Button variant='outlined' onClick={() => router.push('/chats')} sx={{ mt: 1.5, mb: 2, py: 1, borderRadius: '10px' }}>
                        Return to messenger
                    </Button>
                </Stack>
            </Stack>
        </Container>
    );
};

export default Error;
