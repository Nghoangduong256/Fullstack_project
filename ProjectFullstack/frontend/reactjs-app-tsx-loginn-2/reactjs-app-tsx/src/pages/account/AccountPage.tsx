// import css
import { Modal, ModalBody, ModalHeader, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { Account } from '../../types/entity';
import { useEffect, useState } from 'react';
import { accountService } from '../../api/accountService';
import { departmentService } from '../../api/departmentService';
import { Department } from '../../types/entity';

function AccountPage() {
    const [open, setOpen] = useState(false);
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);

    // departments for select
    const [departments, setDepartments] = useState<Department[]>([]);

    // form state
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'ROLE_ADMIN' | 'ROLE_USER' | ''>('');
    const [departmentId, setDepartmentId] = useState<number | ''>('');
    const [editingId, setEditingId] = useState<number | null>(null);

    // view modal state
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

    function closeModal() {
        setUsername('');
        setEmail('');
        setFullName('');
        setRole('');
        setDepartmentId('');
        setEditingId(null);
        setOpen(false);
    }

    function openForCreate() {
        setEditingId(null);
        setUsername('');
        setEmail('');
        setFullName('');
        setRole('');
        setDepartmentId('');
        setOpen(true);
    }

    function openViewModal(acc: Account) {
        setSelectedAccount(acc);
        setViewOpen(true);
    }

    function closeViewModal() {
        setSelectedAccount(null);
        setViewOpen(false);
    }

    // load initial data using useEffect and departmentService
    async function fetchAccounts() {
        try {
            const data = await accountService.getAccountsByPage(page, limit);
            setAccounts(data.data);
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Failed to fetch accounts:', error);
            // fallback to initial data
            setAccounts([]);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [page, limit]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editingId != null) {
            try {
                setLoading(true);
                const selectedDept = departments.find(d => d.id === departmentId) || undefined;
                const updated = await accountService.updateAccount(editingId, {
                    userName: username || '',
                    email: email || '',
                    fullName: fullName || '',
                    role: role as 'ROLE_ADMIN' | 'ROLE_USER',
                    department: selectedDept,
                    departmentId: typeof departmentId === "number" ? departmentId : 0,
                    positionId: 1,
                    createDate: new Date().toISOString().slice(0, 10),
                });
                setAccounts(prev => prev.map(a => a.id === editingId ? updated : a));
                setEditingId(null);

                fetchAccounts(); // refresh list after update
            } catch (err: any) {
                setError(err.message || 'Update failed');
            } finally {
                setLoading(false);
            }
        } else {
            try {
                setLoading(true);
                const selectedDept = departments.find(d => d.id === departmentId) || undefined;
                const created = await accountService.createAccount({
                    userName: username || 'new_user',
                    email: email || 'user@example.com',
                    fullName: fullName || '',
                    role: role as 'ROLE_ADMIN' | 'ROLE_USER',
                    departmentId: typeof departmentId === "number" ? departmentId : 0,
                    department: selectedDept,
                    positionId: 1,
                    createDate: new Date().toISOString().slice(0, 10),
                });

                // After creating, refresh the list to include the new account
                const all = await accountService.getAllAccounts();
                const newTotal = all.length;
                const lastPage = Math.ceil(newTotal / limit);

                // If the current page is the last page, just add the new account to the list
                setTotal(newTotal);
                setPage(lastPage);

            } catch (err: any) {
                setError(err.message || 'Create failed');
            } finally {
                setLoading(false);
            }
        }

        // reset form and close modal
        setUsername('');
        setEmail('');
        setFullName('');
        setRole('');
        setDepartmentId('');
        setOpen(false);
    }

    async function handleDelete(id: number) {
        if (!window.confirm('Are you sure you want to delete this account?')) return;
        try {
            setLoading(true);
            await accountService.deleteAccount(id);
            setAccounts(prev => prev.filter(a => a.id !== id));
        } catch (err: any) {
            setError(err.message || 'Delete failed');
        } finally {
            setLoading(false);
        }
    }

    function handleEdit(acc: Account) {
        setEditingId(acc.id);
        setUsername(acc.userName);
        setFullName(acc.fullName ?? '');
        setEmail(acc.email);
        setRole(acc.role);
        setDepartmentId(acc.department?.id ?? '');
        setOpen(true);
    }

    useEffect(() => {
        // load accounts
        let mounted = true;
        (async () => {
            try {
                setLoading(true);
                // load departments and accounts in parallel
                const [depts, list] = await Promise.all([
                    departmentService.getAllDepartments(),
                    accountService.getAccountsByPage(page, limit),
                ]);
                if (mounted) {
                    setDepartments(depts);
                    setAccounts(list.data);
                    setTotal(list.total || 0);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load accounts');
            } finally {
                setLoading(false);
            }
        })();
        return () => { mounted = false };
    }, [page, limit]);

    return (
        <div className='container-fluid px-4'>
            <h2 className='mb-4'>Quản lý người dùng</h2>
            <button className="btn btn-success mb-3" onClick={openForCreate}>
                <i className="fas fa-plus" style={{ color: '#ffffff' }}></i>
                Thêm tài khoản mới</button>

            <Modal isOpen={open} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>{editingId ? 'Cập nhật tài khoản' : 'Thêm tài khoản mới'}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phòng ban</label>
                            <select className="form-select" value={departmentId} onChange={e => setDepartmentId(e.target.value === '' ? '' : Number(e.target.value))}>
                                <option value="">Chọn phòng ban</option>
                                {departments.map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Vị trí</label>
                            <select className="form-select" value={role} onChange={e => setRole(e.target.value as 'ROLE_ADMIN' | 'ROLE_USER' | '')}>
                                <option value="">Chọn vị trí</option>
                                <option value="ROLE_ADMIN">ADMIN</option>
                                <option value="ROLE_USER">USER</option>
                            </select>
                        </div>


                        <button type="submit" className="btn btn-primary">Xác nhận</button>
                    </form>
                </ModalBody>
            </Modal>

            {/* View Account Modal */}
            <Modal isOpen={viewOpen} toggle={closeViewModal}>
                <ModalHeader toggle={closeViewModal}>Thông tin tài khoản</ModalHeader>
                <ModalBody>
                    {selectedAccount ? (
                        <div>
                            <p><strong>ID:</strong> {selectedAccount.id}</p>
                            <p><strong>Username:</strong> {selectedAccount.userName}</p>
                            <p><strong>Email:</strong> {selectedAccount.email}</p>
                            <p><strong>Họ và tên:</strong> {selectedAccount.fullName ?? '-'}</p>
                            <p>
                                <strong>Phòng ban:</strong>{' '}
                                {selectedAccount.department?.name ?? departments.find(d => d.id === selectedAccount.departmentId)?.name ?? '-'}
                            </p>
                            <p><strong>Vị trí:</strong> {selectedAccount.role}</p>
                            <p><strong>Ngày tạo:</strong> {selectedAccount.createDate}</p>
                        </div>
                    ) : null}
                </ModalBody>
            </Modal>

            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            <Table hover striped>
                <thead>
                    <tr className="table-dark">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Họ và tên</th>
                        <th>Phòng ban</th>
                        <th>Vị trí</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map(a => (
                        <tr key={a.id} style={{ cursor: 'pointer' }} onClick={() => openViewModal(a)}>
                            <td>{a.userName}</td>
                            <td>{a.email}</td>
                            <td>{a.fullName ?? '-'}</td>
                            {/* Filter departments list to get name by departmentId (fallback if department object not present) */}
                            <td>{a.department?.name ?? (departments.find(d => d.id == (a.departmentId))?.name) ?? '-'}</td>
                            <td>{a.role}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={e => { e.stopPropagation(); handleEdit(a); }}>Sửa</button>
                                <button className="btn btn-danger" onClick={e => { e.stopPropagation(); handleDelete(a.id); }}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
                <Pagination aria-label="Page navigation">
                    {/* First page */}
                    <PaginationItem disabled={page === 1}>
                        <PaginationLink first onClick={() => setPage(1)} />
                    </PaginationItem>

                    {/* Previous page */}
                    <PaginationItem disabled={page === 1}>
                        <PaginationLink previous onClick={() => setPage(p => Math.max(1, p - 1))} />
                    </PaginationItem>

                    {/* Page numbers */}
                    {[...Array(Math.ceil(total / limit))].map((_, i) => (
                        <PaginationItem key={i} active={page === i + 1}>
                            <PaginationLink onClick={() => setPage(i + 1)}>
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Next page */}
                    <PaginationItem disabled={page >= Math.ceil(total / limit)}>
                        <PaginationLink next onClick={() => setPage(p => Math.min(Math.ceil(total / limit), p + 1))} />
                    </PaginationItem>

                    {/* Last page */}
                    <PaginationItem disabled={page >= Math.ceil(total / limit)}>
                        <PaginationLink last onClick={() => setPage(Math.ceil(total / limit))} />
                    </PaginationItem>
                </Pagination>
            </div>
        </div>
    );

}

export default AccountPage;