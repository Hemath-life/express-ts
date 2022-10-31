import * as role from '../../components/role/index';
import { Router } from 'express';
const router = Router();

router.post('/', role.createRole);
router.get('/', role.getAllRoles);
router.get('/:id', role.getRole);
router.put('/:id', role.updateRole);
router.delete('/:id', role.deleteRole);

export default router;
