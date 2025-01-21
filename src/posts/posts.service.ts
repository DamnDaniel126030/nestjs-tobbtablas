import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {

  constructor(private readonly db: PrismaService){}


  create(createPostDto: CreatePostDto) {
    return this.db.post.create({ data: createPostDto});
  }

  newComment(id: number, createCommentDto: CreateCommentDto){
    return this.db.comment.create({
      data: {
        ...createCommentDto,
        post: {
          connect: {id: id}
        }
      }
    })
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return this.db.post.findUnique( {
      where: {
        id: id
      },
      include: {
        comments: true
      }
    })
  }

  removeAuthor(id: number, authorId: number){
    return this.db.post.update({
      where: { id: id },
      data: {
        authors: {
          disconnect: {id: authorId}
        }
      }
    })
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
