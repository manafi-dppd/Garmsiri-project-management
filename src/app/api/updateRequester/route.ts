import {NextApiRequest, NextApiResponse} from 'next';
import {sqlServerClient} from '@prisma/db';

const prisma = sqlServerClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const {
      idPumpStation,
      sal,
      mah,
      dahe,
      firstName,
      lastName,
      tozihErsal,
      taedAbMantaghe,
    } = req.body;

    try {
      const now = new Date();
      const localDate = new Date(
        now.getTime() - now.getTimezoneOffset() * 60000,
      );

      const updatedProgram = await prisma.taeedProgram.updateMany({
        where: {
          FIdPumpSta: idPumpStation,
          Sal: sal,
          Mah: mah,
          Dahe: dahe,
        },
        data: {
          FirstNErsal: firstName,
          LastNErsal: lastName,
          TozihErsal: tozihErsal,
          TarikhErsal: localDate,
          TaedAbMantaghe: taedAbMantaghe,
        },
      });

      res.status(200).json(updatedProgram);
    } catch (error) {
      res.status(500).json({error: 'Failed to update TaeedProgram'});
    }
  } else {
    res.status(405).json({error: 'Method not allowed'});
  }
}
