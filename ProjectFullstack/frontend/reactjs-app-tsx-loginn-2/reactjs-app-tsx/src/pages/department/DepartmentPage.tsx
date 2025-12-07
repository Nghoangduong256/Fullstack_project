// import css
import { Modal, ModalBody, ModalHeader, Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Department } from '../../types/entity';
import { useState, useEffect } from 'react';
import departmentService from '../../api/departmentService';

function DepartmentPage() {
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState<Department[]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Pagination state
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [total, setTotal] = useState(0);

    // form state
    const [name, setName] = useState('');
    const [totalMember, setTotalMember] = useState<number | ''>('');
    const [type, setType] = useState<'DEV' | 'TEST' | ''>('DEV');
    const [editingId, setEditingId] = useState<number | null>(null);

    // view modal state
    const [viewOpen, setViewOpen] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<any>(null); // replace 'any' with Account type if available

    function closeViewModal() {
        setViewOpen(false);
        setSelectedDepartment(null);
    }

    function openViewModal(department: any) { // replace 'any' with Account type if available
        setSelectedDepartment(department);
        setViewOpen(true);
    }

    // load initial data using useEffect and departmentService
    async function fetchDepartments() {
        try {
            const data = await departmentService.getDepartmentsByPage(page, limit);
            setDepartments(data.data);
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Failed to fetch departments:', error);
            // fallback to initial data
            setDepartments([]);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [page, limit]);

    function closeModal() {
        // reset form and editing state when modal closes
        setName('');
        setTotalMember('');
        setType('');
        setEditingId(null);
        setOpen(false);
    }

    function openForCreate() {
        setEditingId(null);
        setName('');
        setTotalMember('');
        setType('');
        setOpen(true);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editingId != null) {
            // update existing

            // department object to update
            const updateDepartment: Department = {
                id: editingId,
                name: name || '',
                totalMember: Number(totalMember) || 0,
                type: type as 'DEV' | 'TEST' || 'DEV',
            };

            // call update department
            departmentService.updateDepartment(editingId, updateDepartment)
                .then(updatedDept => {
                    // c1: update local state
                    setDepartments(prev => prev ? prev.map(d => d.id === editingId ? updatedDept : d) : []);

                    // c2: call api get list again
                    fetchDepartments()
                })
                .catch(error => {
                    console.error('Failed to update department:', error);
                });

            setEditingId(null);
        } else {
            // create new
            const newDept: Department = {
                name: name || 'New Department',
                totalMember: Number(totalMember) || 0,
                type: type as 'DEV' | 'TEST' || 'DEV',
                createDate: new Date().toISOString().slice(0, 10),
            };
            // call create department

            departmentService.createDepartment(newDept)
                .then(async createdDept => {
                    // c1: update local state
                    // const all = await departmentService.getAllDepartments();
                    // const newTotal = all.length;
                    // const lastPage = Math.ceil(newTotal / limit);

                    // setTotal(newTotal);
                    // setPage(lastPage);
                    // fetchDepartments()

                    //  c2: Cập nhật state ngay lập tức (không cần chờ fetch)
                    setDepartments(prev => prev ? [...prev, createdDept] : [createdDept]);

                    setTotal(prev => prev + 1);

                    const lastPage = Math.ceil((total + 1) / limit);
                    setPage(lastPage);
                })
                .catch(error => {
                    console.error('Failed to create department:', error);
                });
        }

        // reset form & close modal
        setName('');
        setTotalMember('');
        setType('');
        setOpen(false);
    }

    function handleDelete(id: number) {
        if (window.confirm('Bạn có chắc chắn muốn xóa phòng ban này không?')) {
            // call delete department
            departmentService.deleteDepartment(id)
                .then(() => {
                    // C1: update local state after deletion to not call API again
                    setDepartments(prev => prev ? prev.filter(d => d.id !== id) : []);

                    // C2: call api get list again
                    // fetchDepartments();
                })
                .catch(error => {
                    console.error('Failed to delete department:', error);
                });
        }
    }

    function handleEdit(dep: Department) {
        setEditingId(dep.id ?? null);
        setName(dep.name);
        setTotalMember(dep.totalMember);
        setType(dep.type);
        setOpen(true);
    }

    if (!departments) {
        return <div>No data display...</div>;
    }


    return (
        <div className='container-fluid px-4'>
            <h2 className='mb-4'>Quản lý phòng ban</h2>
            <button className="btn btn-success mb-3" onClick={openForCreate}>
                <i className="fas fa-plus" style={{ color: '#ffffff' }}></i>
                Thêm phòng ban mới</button>

            <Modal isOpen={open} toggle={closeModal}>
                <ModalHeader toggle={closeModal}>{editingId ? 'Cập nhật phòng ban' : 'Thêm phòng ban mới'}</ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Tên phòng ban</label>
                            <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số lượng thành viên</label>
                            <input className="form-control" value={totalMember} onChange={e => setTotalMember(e.target.value === '' ? '' : Number(e.target.value))} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Loại phòng ban</label>
                            <select className="form-select" value={type} onChange={e => setType(e.target.value as 'DEV' | 'TEST' | '')}>
                                <option value="">Chọn loại phòng ban</option>
                                <option value="DEV">DEV</option>
                                <option value="TEST">TEST</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Xác nhận</button>
                    </form>
                </ModalBody>
            </Modal>



            {/* View Department Modal */}
            <Modal isOpen={viewOpen} toggle={closeViewModal}>
                <ModalHeader toggle={closeViewModal}>Thông tin phòng ban</ModalHeader>
                <ModalBody>
                    {selectedDepartment ? (
                        <div>
                            <p><strong>ID:</strong> {selectedDepartment.id}</p>
                            <p><strong>Tên phòng ban:</strong> {selectedDepartment.name}</p>
                            <p><strong>Số lượng thành viên:</strong> {selectedDepartment.totalMember}</p>
                            <p><strong>Loại phòng ban:</strong> {selectedDepartment.type}</p>
                            <p><strong>Ngày tạo:</strong> {selectedDepartment.createDate}</p>
                        </div>
                    ) : null}
                </ModalBody>
            </Modal>

            {loading && <p>Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}

            <Table hover striped>
                <thead>
                    <tr className="table-dark">
                        <th>Phòng ban</th>
                        <th>Số lượng thành viên</th>
                        <th>Loại phòng ban</th>
                        <th>Ngày tạo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(d => (
                        <tr key={d.id} style={{ cursor: 'pointer' }} onClick={() => openViewModal(d)}>
                            <td>{d.name}</td>
                            <td>{d.totalMember}</td>
                            <td>{d.type}</td>
                            <td>{d.createDate}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={e => { e.stopPropagation(); handleEdit(d); }}>Sửa</button>
                                <button
                                    className="btn btn-danger"
                                    onClick={e => {
                                        e.stopPropagation();
                                        if (d.id != null) handleDelete(d.id);
                                    }}
                                >
                                    Xóa
                                </button>
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
        </div >


    );
}

export default DepartmentPage;
