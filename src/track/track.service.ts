import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTractDto } from './dto/create-track.dto';
import { UpdateTractDto } from './dto/update-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTractDto, picture, audio): Promise<Track> {
    const audioPath = this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track.save();
  }
  async update(dto: UpdateTractDto): Promise<Track> {
    const track = await this.trackModel.findByIdAndUpdate(
      { _id: dto._id },
      dto,
      { new: true },
    );
    return track;
  }
  async getAll(): Promise<Track[]> {
    const tracks = await this.trackModel.find();
    return tracks;
  }
  async getOne(id: ObjectId): Promise<Track> {
    const track = await await this.trackModel.findById(id).populate('comments');
    return track;
  }
  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    console.log(dto);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id);
    await track.save();
    return comment;
  }
}
