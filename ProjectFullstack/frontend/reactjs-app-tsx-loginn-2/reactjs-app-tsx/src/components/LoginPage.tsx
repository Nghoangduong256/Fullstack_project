import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Alert,
    FormFeedback,
    FormText,
} from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { accountService } from '../api/accountService';

const BackgroundImage =
    'https://images8.alphacoders.com/136/thumb-1920-1363709.png';
const Logo =
    'https://vti.com.vn/wp-content/uploads/2025/03/Logo-white.svg';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [remember, setRemember] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    const from = (location.state as any)?.from?.pathname ?? '/accounts';

    const { login: setAuth } = useAuth();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if (!username || !password) {
            setError("Vui lòng nhập đầy đủ username và mật khẩu.");
            return;
        }

        try {
            setLoading(true);

            //login với JWT
            const response = await accountService.login(username, password);

            setMessage(`Chào mừng trở lại, ${response.username}!`);

            // lưu vào AuthContext (optional)
            setAuth(response);

            // chuyển trang
            navigate(from, { replace: true });

        } catch (err: any) {
            setError("Username hoặc mật khẩu không đúng. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="login-wrapper"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {/* Overlay */}
            <div className="login-overlay"></div>

            {/* Card */}
            <div className="login-card shadow-lg p-4 bg-white rounded position-relative">
                <div className="text-center mb-3">
                    <img src={Logo} alt="logo" style={{ width: 100, height: 100 }} />
                </div>
                <h4 className="text-center mb-4 fw-bold">Sign In</h4>

                {error && (
                    <Alert color="danger" toggle={() => setError(null)}>
                        {error}
                    </Alert>
                )}

                {message && (
                    <Alert color="success" toggle={() => setMessage(null)}>
                        {message}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="exampleInputUsername">Username</Label>
                        <Input
                            type="text"
                            className="form-control"
                            id="exampleInputUsername"
                            aria-describedby="usernameHelp"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="your_username"
                            autoComplete="username"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="exampleInputPassword1">Password</Label>
                        <Input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </FormGroup>

                    <FormGroup check className="mb-3">
                        <Input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                            checked={remember}
                            onChange={e => setRemember(e.target.checked)}
                        />{' '}
                        <Label className="form-check-label" htmlFor="exampleCheck1">
                            Remember me
                        </Label>
                    </FormGroup>

                    <Button
                        color="primary"
                        type="submit"
                        className="w-100"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </Button>

                    <div className="text-end mt-2">
                        <Button color="link" className="p-0 text-muted">
                            Forgot password?
                        </Button>
                    </div>
                </Form>

                <div className="text-center text-muted small mt-4">
                    Made by VTI | © 2025
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
