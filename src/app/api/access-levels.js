// File: src/pages/api/access-levels.js
import prisma from '@/lib/prisma'; // Assumes you have Prisma set up

export default async function handler(req, res) {
  const {method} = req;

  switch (method) {
    case 'GET':
      try {
        const {positionId} = req.query;
        if (!positionId) {
          return res.status(400).json({message: 'Position ID is required.'});
        }

        const accessLevels = await prisma.accessLevel.findMany({
          where: {positionId: Number(positionId)},
          include: {
            menu: {
              select: {id: true, title: true, title_fa: true},
            },
          },
        });

        return res.status(200).json(accessLevels);
      } catch (error) {
        console.error('Error fetching access levels:', error);
        return res.status(500).json({message: 'Internal server error.'});
      }

    case 'POST':
      try {
        const {editedAccessLevels} = req.body;

        if (!Array.isArray(editedAccessLevels)) {
          return res.status(400).json({message: 'Invalid data format.'});
        }

        const updatedAccessLevels = await Promise.all(
          editedAccessLevels.map(async (accessLevel) =>
            prisma.accessLevel.update({
              where: {id: accessLevel.id},
              data: {hasAccess: accessLevel.hasAccess},
            }),
          ),
        );

        return res.status(200).json({
          message: 'Access levels updated successfully.',
          updatedAccessLevels,
        });
      } catch (error) {
        console.error('Error updating access levels:', error);
        return res.status(500).json({message: 'Internal server error.'});
      }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({message: `Method ${method} not allowed.`});
  }
}
