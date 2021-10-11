import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTractDto } from './dto/create-track.dto';
import { UpdateTractDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}
  async create(dto: CreateTractDto): Promise<Track> {
    const track = await this.trackModel.create({ ...dto, listens: 0 });
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
    const track = await this.trackModel.findById(id);
    return track;
  }
  async delete(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track;
  }
}
