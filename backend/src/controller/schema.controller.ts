import { inject, injectable } from 'inversify';
import { SchemaService } from '../service/schema.service';
import { TYPES } from '../types';
import { Request, Response } from 'express';

@injectable()
export class SchemaController {
  constructor(
    @inject(TYPES.SchemaService) private schemaService: SchemaService,
  ) {}

  async add(req: Request, res: Response): Promise<Response<{ url: string }>> {
    const schemaUrl = req.body.schemaUrl;
    try {
      const result = await this.schemaService.add(schemaUrl);
      return res.status(200).json(result);
    } catch (e) {
      return res.status(500).send('Unable to add schema!');
    }
  }

  submit(req: Request, res: Response): Response<{ url: string }> {
    const { id, formData } = req.body;
    const result = this.schemaService.submit({ id, formData });
    return res.status(200).send(result);
  }
}
