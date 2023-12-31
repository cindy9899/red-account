/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import Head from 'next/head';
import Password from '../components/password';
import Agreement from '../components/agreement';
import Privacy from '../components/privacy';
import Footer from '../components/footer';
import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '@prisma/client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';

export default function Index({ alert_show }: any) {
    const router = useRouter()
    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm<User>({mode: 'onSubmit'})
    
    const onValid: SubmitHandler<User> = async (formData) => {
        const { id, password } = formData;
        const res = await signIn('id-pw-credential', {
            id,
            password,
            redirect: false
        });

        res?.status === 401 /* null */ && alert('로그인 정보가 일치하지 않습니다.');
        if(res?.status === 200) {
            await Promise.all([router.replace('/main'), reset()])
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        localStorage.setItem('top_resize', JSON.stringify(window.innerWidth));
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        localStorage.setItem('top_resize', JSON.stringify(window.innerWidth));
    };

    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="description" content="Red Account" />
                <meta name="author" content="" />
                <meta name="generator" content="" />
                <meta
                    httpEquiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
                <title>Red Account</title>
            </Head>

            <div id="content" className="container">
                <div className="login_wrap">
                    <div className="login_box">
                        <h1>
                            <span>
                                <img
                                    src="/img/logo.svg"
                                    alt=""
                                    className="logo_img"
                                />
                            </span>
                            <span>Red Account</span>
                        </h1>
                        <form onSubmit={handleSubmit(onValid)}>
                            <ul className="login_input">
                                <li>
                                    <input
                                        {...register('id', {
                                            required: {
                                                value: true,
                                                message:
                                                    '아이디는 필수 입력 사항입니다.',
                                            },
                                        })}
                                        name={'id'}
                                        type="text"
                                        placeholder="아이디를 입력해주세요."
                                        required
                                    />
                                </li>
                                <li>
                                    <input
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message:
                                                    '패스워드는 필수 입력 사항입니다.',
                                            },
                                        })}
                                        name={'password'}
                                        type="password"
                                        placeholder="비밀번호를 입력해주세요."
                                        required
                                    />
                                </li>
                            </ul>
                            <div className="login_info">
                                <div className="info_row check_form">
                                    <label className="checkbox">
                                        <input type="checkbox" />
                                        <span className="checkbox_icon"></span>
                                        <span className="checkbox_text"></span>
                                        아이디저장
                                    </label>
                                </div>
                                <div className="info_row end_f">
                                    <Link
                                        href=""
                                        className=""
                                        onClick={() => {
                                            alert_show('password_popup');
                                            return false;
                                        }}
                                    >
                                        <span className="md_link f_19">
                                            비밀번호변경
                                        </span>
                                    </Link>
                                </div>
                            </div>
                            <div className="btn_wrap">
                                <button type='submit' className="point_bg btn_login">
                                    로그인
                                </button>
                                <ul className="info_list">
                                    <li>
                                        <Link
                                            href=""
                                            className="sm_link"
                                            id=""
                                            onClick={() => {
                                                alert_show('privacy_popup');
                                                return false;
                                            }}
                                        >
                                            개인정보처리방침
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href=""
                                            className="sm_link"
                                            id=""
                                            onClick={() => {
                                                alert_show('agreement_popup');
                                                return false;
                                            }}
                                        >
                                            전자금융거래이용약관
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div>

                    <div id="footer" className="main_footer">
                        <p className="gray_t">
                            Copyright 2023 © Red Account All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
            <Privacy />
            <Password />
            <Agreement />
            <Footer />
        </>
    );
}
