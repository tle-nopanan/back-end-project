import { RequestHandler } from "express";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IErrorDto } from "../dto/error";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { AuthStatus } from "../middleware/jwt";
import {
  IContentDto,
  ICreateContentDto,
  IUpdateContentDto,
} from "../dto/content";

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  getPersonalInfo: RequestHandler<
    {},
    IUserDto | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  >;
}

export interface IContentHandler {
  createContent: RequestHandler<
    {},
    IContentDto | IErrorDto,
    ICreateContentDto,
    undefined,
    AuthStatus
  >;
  getContentById: RequestHandler<{ id: string }, IContentDto | IErrorDto>;
  getAllContents: RequestHandler<{}, IContentDto[] | IErrorDto>;
  updateContentById: RequestHandler<
    { id: string },
    IContentDto | IErrorDto,
    IUpdateContentDto
  >;
  deleteContentById: RequestHandler<{ id: string }, IContentDto | IErrorDto>;
}
