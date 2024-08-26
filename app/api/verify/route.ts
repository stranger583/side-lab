// pages/api/verify.js
import jwt from 'jsonwebtoken';

export default function handler(req, res) {
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ decoded });
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
}
