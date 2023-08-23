import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UrlCheck } from '../../url-chek/entities/url-chek.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => UrlCheck, (urlCheck) => urlCheck.user)
  urlChecks?: UrlCheck[];
}
