import { Router } from 'express';
import InterviewSpace from '../Schemas/InterviewSpaceModel.js';
import { randomUUID } from 'crypto';

const interviewRoutes = Router();

interviewRoutes.post('/interview-create', async (req, res) => {
  try {
    const payload = req.body;
    console.log('[API] interview-create request:', {
      title: payload?.title,
      ownerId: payload?.ownerId,
      candidateEmail: payload?.candidateEmail,
    });

    const required = ['ownerId', 'title', 'scheduledAt', 'candidateEmail'];
    const missing = required.filter((k) => !payload?.[k]);
    if (missing.length) {
      return res.status(400).json({ error: 'Missing required fields', missing });
    }

    const videoRoomId = payload.videoRoomId || `video_${randomUUID()}`;
    const codeRoomId = payload.codeRoomId || `code_${randomUUID()}`;
    const whiteBoardRoom = payload.whiteBoardRoom || `wb_${randomUUID()}`;
    const scheduledAt = payload.scheduledAt ? new Date(payload.scheduledAt) : null;

    const doc = {
      ownerId: payload.ownerId,
      title: payload.title,
      scheduledAt,
      candidateId: payload.candidateId || null,
      candidateEmail: payload.candidateEmail,
      invitedInterviewers: Array.isArray(payload.invitedInterviewers) ? payload.invitedInterviewers : [],
      dsaQuestions: Array.isArray(payload.dsaQuestions) ? payload.dsaQuestions : [],
      videoRoomId,
      codeRoomId,
      whiteBoardRoom,
    };

    const created = await InterviewSpace.create(doc);
    console.log('[API] interview-create success:', { id: created._id, videoRoomId });

    return res.status(201).json({ success: true, interviewSpace: created });
  } catch (err) {
    console.error('[API] Create interview space error:', err.message);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});

export default interviewRoutes;
