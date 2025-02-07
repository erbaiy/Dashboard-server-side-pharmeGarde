
import { Test, TestingModule } from '@nestjs/testing';
import { PharmacyService } from './pharmacy.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CreatePharmacyDto } from './Dtos/create-pharmacy.dto';
import { UpdatePharmacyDto } from './Dtos/update-pharmacy.dto';
import { Types } from 'mongoose';

describe('PharmacyService', () => {
  let service: PharmacyService;

  const mockPharmacy = {
    _id: 'testid',
    administrator: new Types.ObjectId(),
    name: 'Test Pharmacy',
    address: '123 Test St',
    phoneNumber: '1234567890',
    openingHoursNight: '10PM-6AM',
    nightshift: true,
    weekendshift: false,
    dutyDate: new Date(),
    imageUrl: 'http://test.com/image.jpg'
  };

  const mockPharmacyModel = {
    findOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    save: jest.fn().mockResolvedValue(mockPharmacy),
    exec: jest.fn(),
    new: jest.fn().mockResolvedValue(mockPharmacy)
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PharmacyService,
        {
          provide: getModelToken('Pharmacy'),
          useValue: mockPharmacyModel
        }
      ],
    }).compile();

    service = module.get<PharmacyService>(PharmacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a pharmacy', async () => {
      const createPharmacyDto: CreatePharmacyDto = {
        administrator: new Types.ObjectId('67a5f1e6a1d2e2fd7184df20'),
        name: 'Test Pharmacy',
        address: '123 Test St',
        phoneNumber: '1234567890',
        openingHoursNight: '10PM-6AM',
        nightshift: true,
        weekendshift: false,
        dutyDate: new Date('2025-02-07T11:43:34.236Z'),
        imageUrl: 'http://test.com/image.jpg'
      };

      mockPharmacyModel.findOne.mockReturnValue({ exec: () => null });
      mockPharmacyModel.save.mockResolvedValue({
        _id: 'testid',
        ...createPharmacyDto
      });

      const result = await service.create(createPharmacyDto);
      expect(result).toEqual({
        _id: 'testid',
        ...createPharmacyDto
      });
    });

    it('should throw ConflictException if pharmacy exists', async () => {
      const createPharmacyDto: CreatePharmacyDto = {
        administrator: new Types.ObjectId(),
        name: 'Test Pharmacy',
        address: '123 Test St',
        phoneNumber: '1234567890',
        nightshift: true,
        weekendshift: false
      };

      mockPharmacyModel.findOne.mockReturnValue({ exec: () => mockPharmacy });

      const result = await service.create(createPharmacyDto);
      expect(result).toBe('ops smth went wrong ');
    });
  });

  describe('findAll', () => {
    it('should return array of pharmacies', async () => {
      mockPharmacyModel.find.mockReturnValue({ exec: () => [mockPharmacy] });

      const result = await service.findAll();
      expect(result).toEqual([mockPharmacy]);
    });
  });

  describe('findOne', () => {
    it('should return a pharmacy', async () => {
      mockPharmacyModel.findById.mockReturnValue({ exec: () => mockPharmacy });

      const result = await service.findOne('testid');
      expect(result).toEqual(mockPharmacy);
    });

    it('should return error message if pharmacy not found', async () => {
      mockPharmacyModel.findById.mockReturnValue({ exec: () => null });

      const result = await service.findOne('testid');
      expect(result).toBe('ops smth went wrong');
    });
  });

  describe('update', () => {
    it('should update a pharmacy', async () => {
      const updatePharmacyDto: UpdatePharmacyDto = {
        name: 'Updated Pharmacy'
      };

      mockPharmacyModel.findByIdAndUpdate.mockReturnValue({ 
        exec: () => ({...mockPharmacy, ...updatePharmacyDto})
      });

      const result = await service.update('testid', updatePharmacyDto);
      expect(result).toEqual({...mockPharmacy, ...updatePharmacyDto});
    });

    it('should return error message if pharmacy not found', async () => {
      mockPharmacyModel.findByIdAndUpdate.mockReturnValue({ exec: () => null });

      const result = await service.update('testid', {});
      expect(result).toBe('ops smth went wrong');
    });
  });

  describe('remove', () => {
    it('should delete a pharmacy', async () => {
      mockPharmacyModel.findById.mockResolvedValue(mockPharmacy);
      mockPharmacyModel.findByIdAndDelete.mockReturnValue({ exec: () => mockPharmacy });

      const result = await service.remove('testid');
      expect(result).toBe('pharmacy was deleted successfully');
    });

    it('should return error if pharmacy not found', async () => {
      mockPharmacyModel.findById.mockResolvedValue(null);

      const result = await service.remove('testid');
      expect(result).toBe('pharmacy not found');
    });
  });
});


