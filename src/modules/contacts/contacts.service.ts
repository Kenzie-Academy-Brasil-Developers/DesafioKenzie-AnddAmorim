import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Contact } from './entities/contact.entity';
import { NotFoundError } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService){}
  async create(createContactDto: CreateContactDto, userId: string) {
    const contact = Object.assign(new Contact(), createContactDto)
    const newContact = await this.prisma.contact.create({
      data: {
        id: contact.id,
        name: contact.name,
        email: contact.email,
        telephone: contact.telephone,
        registerDate: contact.registerDate,
        userId
      }
    })
    return newContact
  }

  async findAll() {
    return await this.prisma.contact.findMany()
  }

  async findOne(id: string) {
    const contact = await this.prisma.contact.findUnique({where:{id}})
    if(!contact){
      throw new NotFoundException("Contact Not Found.")
    }
    return contact
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact Not Found.');
    }
    const updateContact = await this.prisma.contact.update({
      where: { id },
      data: { ...updateContactDto },
    });
    return updateContact;
  }

  async remove(id: string) {
    const contact = await this.prisma.contact.findUnique({ where: { id } });
    if (!contact) {
      throw new NotFoundException('Contact Not Found.');
    }
    await this.prisma.contact.delete({ where: { id } });
  }
}
