import { IsString } from 'class-validator'

export class UpdateSiteConfigDto {
  @IsString()
  gmailUrl: string

  @IsString()
  instagramUrl: string

  @IsString()
  wppUrl: string

  @IsString()
  facebookUrl: string
}
